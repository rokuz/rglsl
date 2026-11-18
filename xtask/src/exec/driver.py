import concurrent.futures
import os
import shutil
import subprocess
import sys
import tarfile
import time

TRANSIENT = (
    "ERROR_INCOMPATIBLE_DRIVER",
    "ERROR_INITIALIZATION_FAILED",
    "DEVICE_LOST",
    "device lost",
    "Unable to create vulkan",
)
ATTEMPTS = 3
TAIL_LINES = 20


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
        return ("error", "starting amber: %s" % error), "", "", None, ""
    try:
        out, err = process.communicate(timeout=timeout)
    except subprocess.TimeoutExpired:
        kill_tree(process)
        out, err = process.communicate()
        return ("timeout", "amber timed out"), "", last_lines(err or "", out or ""), process.pid, "timeout"
    code = process.returncode
    return classify(code, out, err), out, last_lines(err, out), process.pid, str(code)


def transient(status):
    return status[0] in ("exit", "crash") and any(word in status[1] for word in TRANSIENT)


def run_job(settings, job):
    amber, version, timeout, base, results, device, attempts = settings
    index, directory, script, dumps, layer, capture = job
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
    command.append(script)
    start = now_ms()
    for attempt in range(attempts):
        status, out, tail, pid, code = run_amber(command, cwd, timeout)
        if not transient(status) or attempt + 1 == attempts:
            break
        time.sleep(2.0 * (attempt + 1))
    end = now_ms()
    with open(os.path.join(results, "%s.run" % index), "w", encoding="utf-8") as file:
        file.write("start %d\nend %d\npid %s\ncode %s\n" % (start, end, "" if pid is None else pid, code))
    if status[0] != "ok" and tail:
        with open(os.path.join(results, "%s.tail" % index), "w", encoding="utf-8") as file:
            file.write(tail)
    if status[0] == "ok" and dumps:
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
        with open(os.path.join(results, "%s.stdout" % index), "w", encoding="utf-8") as file:
            file.write(out)
    with open(os.path.join(results, "%s.status" % index), "w", encoding="utf-8") as file:
        file.write("%s\n%s\n" % status)


def read_manifest(path):
    jobs = []
    with open(path, encoding="utf-8") as file:
        for line in file:
            fields = line.rstrip("\n").split("\t")
            if len(fields) == 5:
                fields.append("")
            if len(fields) != 6:
                continue
            index, directory, script, dumps, layer, capture = fields
            jobs.append(
                (index, directory, script, [d for d in dumps.split(",") if d], layer, capture.split(","))
            )
    return jobs


def main():
    archive, workdir, manifest, output, amber, workers, timeout, version = sys.argv[1:9]
    device = sys.argv[9] if len(sys.argv) > 9 else ""
    attempts = max(1, int(sys.argv[10])) if len(sys.argv) > 10 else ATTEMPTS
    os.makedirs(workdir, exist_ok=True)
    with tarfile.open(archive) as tar:
        tar.extractall(workdir, filter="data")
    os.remove(archive)
    results = os.path.join(workdir, "results")
    os.makedirs(results, exist_ok=True)
    jobs = read_manifest(os.path.join(workdir, manifest))
    settings = (amber, version, float(timeout), workdir, results, device, attempts)
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
