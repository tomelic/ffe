import os
import time
from argparse import ArgumentParser

import subprocess

def main():
    parser = ArgumentParser()
    parser.add_argument("-p", "--prepare", dest="prepare",
                        help="env preparation helper", action='store_true')
    parser.add_argument("-re", "--revert", dest="revert",
                        help="working restart", action='store_true')
    args = parser.parse_args()

    while(args.revert):
        os.system('taskkill /IM nox.exe')
        time.sleep(1)
        os.system('start /B nox.exe')
        subprocess.Popen(['nox_adb', 'wait-for-device', 'shell', "su -c /data/local/tmp/<<frida-server>>"], stdout=subprocess.PIPE)
        return

    while(args.prepare):
        # don't forget to replace <<frida-server>>
        os.system('start /B nox.exe')
        os.system('nox_adb wait-for-device install app-debug.apk')
        os.system('nox_adb push <<frida-server>> /data/local/tmp/')
        os.system('nox_adb shell "chmod 777 /data/local/tmp/<<frida-server>>"')
        return

    # run #
    subprocess.Popen(['nox_adb','shell', "su -c /data/local/tmp/<<frida-server>>"], stdout=subprocess.PIPE) # instead of &
    # os.system('nox_adb shell "am start -n com.package/com.YourMainActivity"')
    time.sleep(6)
    os.system('frida -U com.package -l choose-frida-agent.js --no-pause')
    # os.system('frida -U com.package:<<childprocess>> -l agent.js --no-pause') # sometimes we need to hook child processes (do ps | grep YourApp)

if __name__ == "__main__":
    main()
