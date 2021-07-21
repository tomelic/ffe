# Frida function enumeration
Frida function enumeration and injection. 
Current script requires manual modifications, read the comments :)

<img src="https://github.com/tomelic/ffe/blob/master/example.png" width="690" height="404">

To use:
1. Install frida-server and frida-tools (a good guide can be found here: https://omespino.com/tutorial-universal-android-ssl-pinning-in-10-minutes-with-frida/)

2. modify the frida agent script (choose v1 or v2 - different implementation attempts) to monitor the functions you need

    2.b. adjust accordingly in the pyFrida.py script

3. python pyFrida.py (or just: frida -U com.package -l some-frida-agent.js --no-pause)
