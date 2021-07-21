# Frida function enumeration
Frida function enumeration and injection. 
Current script requires manual modifications, read the comments :)

<img src="https://github.com/tomelic/ffe/blob/master/example.png" width="690" height="404">

# Setup
* Install `frida-server` and `frida-tools` (a good explanation can be found [here](https://omespino.com/tutorial-universal-android-ssl-pinning-in-10-minutes-with-frida)).
* Modify the frida agent script to monitor the functions you want, choose between v1 or v2 (different implementation attempts)

# Usage
* `frida -U com.package -l some-frida-agent.js --no-pause`
