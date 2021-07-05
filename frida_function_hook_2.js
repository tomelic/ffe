// nox_adb shell "chmod 777 /data/local/tmp/<<frida-server>>"
// nox_adb shell "am start -n com.package/com.YourMainActivity"
// nox_adb shell "su -c /data/local/tmp/frida-server"

var apis = [
    // {
    //    class: 'android.os.Process',
    //    method: 'start',
    //    name: 'Process' 
    // },{
    //     class: 'android.os.Process',
    //     method: 'start',
    //     name: 'Process'
    // }, {
    //     class: 'android.app.ActivityManager',
    //     method: 'killBackgroundProcesses',
    //     name: 'Process'
    // }, {
    //     class: 'android.os.Process',
    //     method: 'killProcess',
    //     name: 'Process'
    // }, {
    //     class: 'java.lang.Runtime',
    //     method: 'exec',
    //     name: 'Command'
    // }, {
    //     class: 'java.lang.ProcessBuilder',
    //     method: 'start',
    //     name: 'Command'
    // }, {
    //     class: 'java.lang.Runtime',
    //     method: 'loadLibrary',
    //     name: 'Java Native Interface'
    // }, {
    //     class: 'java.lang.Runtime',
    //     method: 'load',
    //     name: 'Java Native Interface'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'loadUrl',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'loadData',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'loadDataWithBaseURL',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'addJavascriptInterface',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'evaluateJavascript',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'postUrl',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'postWebMessage',
    //     name: 'WebView',
    //     target: 6
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'savePassword',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'setHttpAuthUsernamePassword',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'getHttpAuthUsernamePassword',
    //     name: 'WebView'
    // }, {
    //     class: 'android.webkit.WebView',
    //     method: 'setWebContentsDebuggingEnabled',
    //     name: 'WebView'
    // }, {
    //     class: 'libcore.io.IoBridge',
    //     method: 'open',
    //     name: 'File IO'
    // },
    // {
    //     class: 'android.content.ContextWrapper',
    //     method: 'openFileInput',
    //     name: 'File IO'
    // }, {
    //     class: 'android.content.ContextWrapper',
    //     method: 'openFileOutput',
    //     name: 'File IO'
    // }, {
    //     class: 'android.content.ContextWrapper',
    //     method: 'deleteFile',
    //     name: 'File IO'
    // },
    // {
    //     class: 'android.content.ContextWrapper',
    //     method: 'openOrCreateDatabase',
    //     name: 'Database'
    // }, {
    //     class: 'android.content.ContextWrapper',
    //     method: 'databaseList',
    //     name: 'Database'
    // }, {
    //     class: 'android.content.ContextWrapper',
    //     method: 'deleteDatabase',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'execSQL',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'deleteDatabase',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'getPath',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'insert',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'insertOrThrow',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'insertWithOnConflict',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'openDatabase',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'openOrCreateDatabase',
    //     name: 'Database'
    // },{
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'query',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'queryWithFactory',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'rawQuery',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'rawQueryWithFactory',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'update',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'updateWithOnConflict',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'compileStatement',
    //     name: 'Database'
    // }, {
    //     class: 'android.database.sqlite.SQLiteDatabase',
    //     method: 'create',
    //     name: 'Database'
    // },
    {
        class: 'android.content.ContextWrapper',
        method: 'sendBroadcast',
        name: 'IPC'
    }, {
        class: 'android.content.ContextWrapper',
        method: 'sendStickyBroadcast',
        name: 'IPC'
    }, {
        class: 'android.content.ContextWrapper',
        method: 'startActivity',
        name: 'IPC'
    }, {
        class: 'android.content.ContextWrapper',
        method: 'startService',
        name: 'IPC'
    }, {
        class: 'android.content.ContextWrapper',
        method: 'stopService',
        name: 'IPC'
    }, {
        class: 'android.content.ContextWrapper',
        method: 'registerReceiver',
        name: 'IPC'
    }, {
        class: 'android.os.Debug',
        method: 'isDebuggerConnected',
        name: 'Device Info'
    },
    {
        class: 'java.net.URL',
        method: 'openConnection',
        name: 'Network'
    }, {
        class: 'org.apache.http.impl.client.AbstractHttpClient',
        method: 'execute',
        name: 'Network'
    }, {
        class: 'android.util.Base64',
        method: 'decode',
        name: 'Base64'
    }, {
        class: 'android.util.Base64',
        method: 'encode',
        name: 'Base64'
    }, {
        class: 'android.util.Base64',
        method: 'encodeToString',
        name: 'Base64'
    },
    {
        class: 'android.util.Base64',
        method: 'encodeToString',
        name: 'Base64'
    }
];

// use regexes to identify object patterns (for example in weird variables)
function fingerprint(str) {
    // console.log(str)
    if (str.match(/<html>/gi)) {
        return "<html>"
    } else if (!str.match(/[A-Za-z0-9~!@#$%^&*()_+}{"?>:<;'`-|\\}]|[=]/gi)) {
        // console.log(JSON.stringify(str))
        return "<null>"
    } else {
        console.log("[-] unknown fingerprint:", JSON.stringify(str))
        return "<failed extraction>"
    }
}

// handle werid cases of arguments passed as objects / arrays etc
function extract_args(obj) {
    var extracted = []
    if (Array.isArray(obj)) {
        obj.forEach(function iter(element) {
            if (typeof element === 'object') {
                var charCodesArr = JSON.stringify(obj).replace(/\[/, '').replace(/\]/, '').split(",");
                var stringArr = ""
                for (var i = 0; i < charCodesArr.length; i++) {
                    stringArr += String.fromCharCode(charCodesArr[i]);
                }
                // if it's an object we open it, and return the fingerprint (incase its too large)
                extracted.push(fingerprint(stringArr))
            } else if (typeof element === 'number') {
                extracted.push(element)
            } else {
                obj = "<UN-HANDLED ELEMENT";
            }
        });
    }
    obj = extracted
    return obj
}

// Get All Method Implementations
function get_implementations(toHook) {
    var imp_args = []
    toHook.overloads.forEach(function (impl, _) {
        if (impl.argumentTypes) {
            var args = [];
            var argTypes = impl.argumentTypes
            argTypes.forEach(function (arg_type, __) {
                args.push(arg_type.className)
            });
            imp_args.push(args);
        }
    });
    return imp_args;
}

// Dynamic Hooks
function hook(api, callback) {
    var Exception = Java.use('java.lang.Exception');
    var toHook;
    try {
        var clazz = api.class;
        var method = api.method;
        var name = api.name;
        try {
            if (api.target && parseInt(Java.androidVersion, 10) < api.target) {
                // console.log('[-] Not Hooking unavailable class/method - ' + clazz + '.' + method)
                return
            }
            // Check if class and method is available
            toHook = Java.use(clazz)[method];
            if (!toHook) {
                console.log('[-] Hook failed ' + clazz + '.' + method);
                return
            }
        } catch (err) {
            console.log('[-] Cant find ' + clazz + '.' + method);
            return
        }
        var overloadCount = toHook.overloads.length;
        console.log("[+] Hooking", overloadCount, "overloads")
        for (var i = 0; i < overloadCount; i++) {
            toHook.overloads[i].implementation = function () {
                var argz = [].slice.call(arguments);
                // modify args here
                // example:
                if (argz[1] && typeof argz[1] === 'string') {                                                                              // modify the second argument only
                    argz[1] = argz[1].replace(/someregex/, 'withX').replace(/anotherRegex/, 'withY')        // replace args (as string)
                }

                // Call original function
                var retval = this[method].apply(this, arguments);
                if (callback) {
                    var calledFrom = Exception.$new().getStackTrace().toString().split(',')[1];
                    var message = {
                        name: name,
                        class: clazz,
                        method: method,
                        arguments: argz,
                        result: retval ? retval.toString() : null,
                        calledFrom: calledFrom
                    };
                    retval = callback(retval, message);
                }
                return retval;
            }
        }
    } catch (err) {
        console.log('[-] ERROR: ' + clazz + "." + method + " [\"Error\"] => " + err);
    }
}


Java.performNow(function () {
    apis.forEach(function (api, _) {
        hook(api, function (originalResult, message) {
            message.returnValue = originalResult
            if (originalResult && typeof originalResult === 'object') {
                var s = [];
                for (var k = 0, l = originalResult.length; k < l; k++) {
                    s.push(originalResult[k]);
                }
                message.returnValue = '' + s.join('');
            }
            if (!message.result)
                message.result = undefined
            if (!message.returnValue)
                message.returnValue = undefined

            var msg;
            if (typeof message.arguments === 'object') {
                msg = extract_args(message.arguments)
            } else {
                msg = console.log(JSON.stringify(message))
            }

            // print out caller -> function(args)
            console.log('\x1b[32m[+] \x1b[34m' + message.calledFrom + "\x1b[32m ->", message.class + '.' + message.method + "(" + message.arguments + ")", '\x1b[0m')

            return originalResult;
        });
    });
});
