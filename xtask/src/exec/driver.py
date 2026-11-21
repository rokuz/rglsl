import concurrent.futures
import os
import shutil
import subprocess
import sys
import tarfile
import threading
import time

TRANSIENT = (
    "ERROR_INCOMPATIBLE_DRIVER",
    "ERROR_INITIALIZATION_FAILED",
    "DEVICE_LOST",
    "device lost",
    "Unable to create vulkan",
)
ATTEMPTS = 3
RECOVERY_SECONDS = 15
SETTLE_SECONDS = 3
EVENT_SLACK_MS = 3000
TAIL_LINES = 20
BATCH_DUMP = "{script}.batch.dump.txt"
RECOVERY = threading.Lock()
RESETS = {"count": 0, "limit": 0}
STOPPED = threading.Event()


def first_line(*texts):
    for text in texts:
        for line in text.splitlines():
            line = line.strip()
            if line:
                return line[:300]
    return "no output"


def now_ms():
    return int(time.time() * 1000)


def last_lines(*texts):
    lines = [line.rstrip() for text in texts for line in text.splitlines() if line.strip()]
    return "\n".join(lines[-TAIL_LINES:])


def kill_tree(process):
    subprocess.run(
        ["taskkill", "/T", "/F", "/PID", str(process.pid)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        process.kill()
    except OSError:
        pass


def classify(code, out, err):
    if code == 0:
        return "ok", ""
    if code < 0 or code >= 0xC0000000:
        return "crash", "amber crashed (0x%08X): %s" % (code & 0xFFFFFFFF, first_line(err, out))
    return "exit", "amber exited with %d: %s" % (code, first_line(err, out))


def script_failures(err, script, timed):
    def failed(name):
        prefix = name + ": "
        for line in err.splitlines():
            line = line.strip()
            if line.startswith(prefix):
                return line[:300]
        return None

    if not timed:
        return None
    check, timing = failed(script), failed(timed)
    if check is None and timing is None:
        return None
    return check, timing


def run_amber(command, cwd, timeout):
    try:
        process = subprocess.Popen(
            command,
            cwd=cwd,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            errors="replace",
        )
    except OSError as error:
        return ("error", "starting amber: %s" % error), "", "", "", None, ""
    try:
        out, err = process.communicate(timeout=timeout)
    except subprocess.TimeoutExpired:
        kill_tree(process)
        out, err = process.communicate()
        return ("timeout", "amber timed out"), "", "", last_lines(err or "", out or ""), process.pid, "timeout"
    code = process.returncode
    return classify(code, out, err), out, err, last_lines(err, out), process.pid, str(code)


def transient(status):
    return status[0] in ("exit", "crash") and any(word in status[1] for word in TRANSIENT)


def reset_since(query, start_ms):
    if not query:
        return False
    window = max(0, now_ms() - start_ms + EVENT_SLACK_MS)
    xpath = "*[System[(%s) and TimeCreated[timediff(@SystemTime) <= %d]]]" % (query, window)
    try:
        found = subprocess.run(
            ["wevtutil", "qe", "System", "/q:" + xpath, "/c:1", "/f:text"],
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            text=True,
            errors="replace",
            timeout=60,
        )
    except (OSError, subprocess.TimeoutExpired):
        return True
    return bool(found.stdout.strip())


def recover(query, start_ms):
    time.sleep(SETTLE_SECONDS)
    if not reset_since(query, start_ms):
        return False
    with RECOVERY:
        RESETS["count"] += 1
        if RESETS["limit"] and RESETS["count"] >= RESETS["limit"]:
            STOPPED.set()
        time.sleep(RECOVERY_SECONDS)
    return True


def stopped(results, index):
    if not STOPPED.is_set():
        return False
    write(
        os.path.join(results, "%s.status" % index),
        "stopped\nthe target was stopped: %d driver resets in this batch (limit %d, --max-resets)\n"
        % (RESETS["count"], RESETS["limit"]),
    )
    return True


def write(path, text):
    with open(path, "w", encoding="utf-8") as file:
        file.write(text)


def run_job(settings, job):
    amber, version, timeout, base, results, device, attempts, query = settings
    index, directory, script, dumps, layer, capture, timed, job_timeout, recipes = job
    if job_timeout:
        timeout = float(job_timeout)
    if stopped(results, index):
        return
    if recipes:
        run_batch(settings, job, timeout)
        return
    cwd = os.path.join(base, directory)
    dump = os.path.join(cwd, "batch-%s.dump.txt" % index)
    statistics = "%s.stats.json" % script
    command = [amber, "-d", "-v", version, "-q"]
    if device:
        command += ["--device-name", device]
    if layer == "tensor":
        command += ["--layer-library", os.path.join(os.path.dirname(amber), "VkLayer_Tensor.dll")]
    if dumps:
        command += ["-b", dump]
        for name in dumps:
            command += ["-B", name]
    if "statistics" in capture:
        command += ["--pipeline-stats", statistics]
    if "timing" in capture:
        command.append("--log-execution-timing")
    if timed:
        command.append(timed)
    command.append(script)
    start = now_ms()
    recovered = False
    for attempt in range(attempts):
        with RECOVERY:
            pass
        if attempt > 0 and stopped(results, index):
            return
        status, out, err, tail, pid, code = run_amber(command, cwd, timeout)
        failures = script_failures(err, script, timed) if code == "1" else None
        if failures is not None:
            status = ("ok", "")
        if not transient(status) or attempt + 1 == attempts:
            break
        if recover(query, start):
            recovered = True
            break
        time.sleep(2.0 * (attempt + 1))
    end = now_ms()
    if not recovered and (status[0] == "timeout" or transient(status)):
        recovered = recover(query, start)
    write(
        os.path.join(results, "%s.run" % index),
        "start %d\nend %d\npid %s\ncode %s\nrecovered %d\n"
        % (start, end, "" if pid is None else pid, code, 1 if recovered else 0),
    )
    if (status[0] != "ok" or failures is not None) and tail:
        write(os.path.join(results, "%s.tail" % index), tail)
    if failures is not None:
        for name, failure in zip(("check-error", "timed-error"), failures):
            if failure is not None:
                write(os.path.join(results, "%s.%s" % (index, name)), failure)
    check_ok = failures is None or failures[0] is None
    if status[0] == "ok" and dumps and check_ok:
        try:
            shutil.copyfile(dump, os.path.join(results, "%s.dump" % index))
        except OSError as error:
            status = ("error", "reading the dump: %s" % error)
    if status[0] == "ok" and "statistics" in capture:
        try:
            shutil.copyfile(os.path.join(cwd, statistics), os.path.join(results, "%s.stats.json" % index))
        except OSError:
            pass
    if status[0] == "ok" and "timing" in capture:
        write(os.path.join(results, "%s.stdout" % index), out)
    write(os.path.join(results, "%s.status" % index), "%s\n%s\n" % status)


def run_batch(settings, job, timeout):
    amber, version, _, base, results, device, _, query = settings
    index, directory, script, dumps, layer, capture, _, _, recipes = job
    cwd = os.path.join(base, directory)
    statistics = "%s.stats.json" % script
    command = [amber, "-d", "-v", version, "-q"]
    if device:
        command += ["--device-name", device]
    if layer == "tensor":
        command += ["--layer-library", os.path.join(os.path.dirname(amber), "VkLayer_Tensor.dll")]
    if dumps:
        command += ["-b", BATCH_DUMP]
        for name in dumps:
            command += ["-B", name]
    if "statistics" in capture:
        command += ["--pipeline-stats", statistics]
    if "timing" in capture:
        command.append("--log-execution-timing")
    command += recipes
    with RECOVERY:
        pass
    start = now_ms()
    status, out, err, tail, pid, code = run_amber(command, cwd, timeout)
    end = now_ms()
    recovered = False
    if status[0] == "timeout" or transient(status):
        recovered = recover(query, start)
    write(
        os.path.join(results, "%s.run" % index),
        "start %d\nend %d\npid %s\ncode %s\nrecovered %d\n"
        % (start, end, "" if pid is None else pid, code, 1 if recovered else 0),
    )
    if status[0] not in ("ok", "exit"):
        if tail:
            write(os.path.join(results, "%s.tail" % index), tail)
        write(os.path.join(results, "%s.status" % index), "%s\n%s\n" % status)
        return
    write(os.path.join(results, "%s.stderr" % index), err)
    write(os.path.join(results, "%s.stdout" % index), out)
    try:
        shutil.copyfile(os.path.join(cwd, statistics), os.path.join(results, "%s.stats.json" % index))
    except OSError:
        pass
    for position, recipe in enumerate(recipes):
        try:
            shutil.copyfile(
                os.path.join(cwd, BATCH_DUMP.replace("{script}", recipe)),
                os.path.join(results, "%s.dump.%d" % (index, position)),
            )
        except OSError:
            pass
    write(os.path.join(results, "%s.status" % index), "batch\n%s\n" % code)


def read_manifest(path):
    jobs = []
    with open(path, encoding="utf-8") as file:
        for line in file:
            fields = line.rstrip("\n").split("\t")
            while 5 <= len(fields) < 9:
                fields.append("")
            if len(fields) != 9:
                continue
            index, directory, script, dumps, layer, capture, timed, timeout, recipes = fields
            jobs.append(
                (
                    index,
                    directory,
                    script,
                    [d for d in dumps.split(",") if d],
                    layer,
                    capture.split(","),
                    timed,
                    timeout,
                    [r for r in recipes.split("|") if r],
                )
            )
    return jobs


def main():
    archive, workdir, manifest, output, amber, workers, timeout, version = sys.argv[1:9]
    device = sys.argv[9] if len(sys.argv) > 9 else ""
    attempts = max(1, int(sys.argv[10])) if len(sys.argv) > 10 else ATTEMPTS
    RESETS["limit"] = max(0, int(sys.argv[11])) if len(sys.argv) > 11 else 0
    os.makedirs(workdir, exist_ok=True)
    with tarfile.open(archive) as tar:
        tar.extractall(workdir, filter="data")
    os.remove(archive)
    results = os.path.join(workdir, "results")
    os.makedirs(results, exist_ok=True)
    jobs = read_manifest(os.path.join(workdir, manifest))
    query_file = os.path.join(os.path.dirname(os.path.join(workdir, manifest)), "resets.xpath")
    query = ""
    if os.path.exists(query_file):
        with open(query_file, encoding="utf-8") as file:
            query = file.read().strip()
    settings = (amber, version, float(timeout), workdir, results, device, attempts, query)
    start = now_ms()
    with concurrent.futures.ThreadPoolExecutor(max(1, int(workers))) as pool:
        list(pool.map(lambda job: run_job(settings, job), jobs))
    with open(os.path.join(results, "batch.run"), "w", encoding="utf-8") as file:
        file.write("start %d\nend %d\n" % (start, now_ms()))
    with tarfile.open(output, "w:gz") as tar:
        tar.add(results, arcname="results")
    shutil.rmtree(workdir, ignore_errors=True)
    print("ran %d jobs" % len(jobs))


main()
