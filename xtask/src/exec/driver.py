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
    "ERROR_DEVICE_LOST",
    "Unable to create vulkan",
)
ATTEMPTS = 3


def first_line(*texts):
    for text in texts:
        for line in text.splitlines():
            line = line.strip()
            if line:
                return line[:300]
    return "no output"


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
        status = ("error", "starting amber: %s" % error)
    else:
        try:
            out, err = process.communicate(timeout=timeout)
        except subprocess.TimeoutExpired:
            kill_tree(process)
            process.communicate()
            status = ("timeout", "amber timed out")
        else:
            status = classify(process.returncode, out, err)
    return status


def transient(status):
    return status[0] in ("exit", "crash") and any(word in status[1] for word in TRANSIENT)


def run_job(settings, job):
    amber, version, timeout, base, results = settings
    index, directory, script, dumps = job
    cwd = os.path.join(base, directory)
    dump = os.path.join(cwd, "batch-%s.dump.txt" % index)
    command = [amber, "-d", "-v", version, "-q"]
    if dumps:
        command += ["-b", dump]
        for name in dumps:
            command += ["-B", name]
    command.append(script)
    for attempt in range(ATTEMPTS):
        status = run_amber(command, cwd, timeout)
        if not transient(status):
            break
        time.sleep(0.5 * (attempt + 1))
    if status[0] == "ok" and dumps:
        try:
            shutil.copyfile(dump, os.path.join(results, "%s.dump" % index))
        except OSError as error:
            status = ("error", "reading the dump: %s" % error)
    with open(os.path.join(results, "%s.status" % index), "w", encoding="utf-8") as file:
        file.write("%s\n%s\n" % status)


def read_manifest(path):
    jobs = []
    with open(path, encoding="utf-8") as file:
        for line in file:
            fields = line.rstrip("\n").split("\t")
            if len(fields) != 4:
                continue
            index, directory, script, dumps = fields
            jobs.append((index, directory, script, [d for d in dumps.split(",") if d]))
    return jobs


def main():
    archive, workdir, manifest, output, amber, workers, timeout, version = sys.argv[1:9]
    os.makedirs(workdir, exist_ok=True)
    with tarfile.open(archive) as tar:
        tar.extractall(workdir, filter="data")
    os.remove(archive)
    results = os.path.join(workdir, "results")
    os.makedirs(results, exist_ok=True)
    jobs = read_manifest(os.path.join(workdir, manifest))
    settings = (amber, version, float(timeout), workdir, results)
    with concurrent.futures.ThreadPoolExecutor(max(1, int(workers))) as pool:
        list(pool.map(lambda job: run_job(settings, job), jobs))
    with tarfile.open(output, "w:gz") as tar:
        tar.add(results, arcname="results")
    shutil.rmtree(workdir, ignore_errors=True)
    print("ran %d jobs" % len(jobs))


main()
