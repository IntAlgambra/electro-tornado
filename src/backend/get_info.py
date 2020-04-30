import psutil
import json

def get_cpu_info():
    cpu_info = {}
    physical_cores = psutil.cpu_count(logical=False)
    logical_cores = psutil.cpu_count(logical=True)
    cpufrec = psutil.cpu_freq()
    max_frequency = cpufrec.max
    min_frequency = cpufrec.min
    usage_per_cpu = []
    for i, percentage in enumerate(psutil.cpu_percent(percpu=True, interval=1)):
        usage_per_cpu.append(percentage)
    total_cpu_usage = psutil.cpu_percent()
    cpu_info['physical'] = physical_cores
    cpu_info['logical'] = logical_cores
    cpu_info['maxfreq'] = max_frequency
    cpu_info['minfreq'] = min_frequency
    cpu_info['percpu'] = usage_per_cpu
    cpu_info['total'] = total_cpu_usage
    return json.dumps(cpu_info)

if __name__ == '__main__':
    print(get_cpu_info())
