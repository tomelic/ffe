/**
    This function is used to create a hook on the method described in: 
    package_name.class_name.func_name(func_args)

    The hook will not modify the functionality of the method but only 
    print out the provided parameters and the result returned every time
    the method is called.

    Arguments:
    package_name - The package name of the class the method is in
    class_name - The class name of the class the method is in
    func_name - The name of the method we want to monitor
    func_args - A list of arguments of the specific method, or undefined
                in case we want to hook all available overrides of the method
*/
function monitorFunction(package_name, class_name, func_name, func_args) {
    try {

        const cls = Java.use(package_name + '.' + class_name);
        var should_hook = true;
        console.log(' \x1b[32m[monitorFunction] hooking function: ' + package_name + '.' + class_name + '.' + func_name + "\x1b[0m")
        console.log(" + We got " + cls[func_name].overloads.length + " overloads!")

        for (var index in cls[func_name].overloads) {
            var method_overload = cls[func_name].overloads[index];
            if (method_overload.hasOwnProperty('argumentTypes')) {
                var args_types = [];
                // console.log(" + arg type check : " + method_overload.argumentTypes[0])
                for (var j in method_overload.argumentTypes) {
                    // console.log(" + Addind arg type: " + method_overload.argumentTypes[j].className)
                    args_types.push(method_overload.argumentTypes[j].className);
                }
                // Check if we are looking for a specific overload
                if (func_args != undefined) {
                    should_hook = false;
                    if (method_overload.argumentTypes.length == func_args.length) {
                        for (var a in method_overload.argumentTypes) {
                            if (method_overload.argumentTypes[a] == func_args[a])
                                num_of_same_args++;
                            else break;
                        }
                        if (num_of_same_args = func_args.length) {
                            should_hook = true;
                        }
                    }
                }
                if (should_hook) {
                    // send(msg + '(' + args_types.toString() + ')\n');
                    console.log(" +-> [class]: " + class_name + " [function]: " + func_name + '(' + args_types.toString() + ')');
                    try {
                        method_overload.implementation = function () {
                            console.log(package_name + '.' + class_name)
                            var args = [].slice.call(arguments);
                            // PoC modify data on the fly
                            //if (args[1]) { // say i want to modify the second argument only
                            //    args[1] = args[1].replace(/someregex/,'withMe').replace(/anotherRegex/,'withThat')
                            //    console.log('\x1b[31m'+args[1]+'\x1b[0m')
                            //}

                            var result = this[func_name].apply(this, args);
                            if (result != undefined) {
                                var rstr = result.toString();
                            }
                            // send(func_name + '(' + args.join(', ') + ') => Result: ' + rstr + '\n');
                            console.log('\x1b[34m[+] ' + func_name + '(' + args.join(', ') + ')\x1b[0m')
                            console.log('\x1b[36m +-> Returns: ' + rstr + '\x1b[0m\n')
                            //for chineese (or bad input-) handling
                            // send(func_name+'('+args.join(', ')+')')
                            // send(rstr) 
                            return result;
                        }
                    }
                    catch (e) { console.log(" + hookErr: " + e); }
                }
            }
        }
    }
    catch (e) {
        console.log(' + monitorErr: ', e);
    }
}

/**
    This function is used to create a hook on all the methods described in
    the following class: 
    package_name.class_name

    The hook will not modify the functionality of the methods but only 
    print out the provided parameters and the result returned every time
    a method is called.

    Arguments:
    package_name - The package name of the class the method is in
    class_name - The class name of the class the method is in
*/
function monitorClass(package_name, class_name) {
    var full_class_name = package_name + '.' + class_name;
    const cls = Java.use(full_class_name);
    const funcs = Object.getOwnPropertyNames(cls.$classWrapper.prototype);
    console.log('\x1b[32m[monitorClass] Hooking class: ' + package_name + '.' + class_name + "\x1b[0m")
    for (var f in funcs) {
        try {
            var func_name = funcs[f];
            monitorFunction(package_name, class_name, func_name);
        }
        catch (e) {
            send("Failed hooking class: " + class_name + " Function: " + func_name + "\n");
        }
    }
}

/*
    This function enumerates all the classes of the package and runs "monitorClass" on them.

    Arguments:
    filterString - String to filter classes by

*/
function monitorAllClasses(filterString) {
    Java.enumerateLoadedClasses({
        onMatch: function (classname) {
            // overcome frida api madness
            if (classname.match(/\[|\$/)) {
                classname = classname.replace(/\[[A-Z]/, '').replace(/\[/, '').replace(/\$.*$/, '').replace('\;', '')
            }
            
            if (filterString == undefined) {
                // just split and send to monitorClass
                var extractedFunction = classname.split(/.*\./g).pop()
                classname = classname.replace('.' + extractedFunction, '')
                monitorClass(classname, extractedFunction)
            } else {
                // same, with filtering
                if (classname.indexOf(filterString) !== -1) {
                    var extractedFunction = classname.split(/.*\./g).pop()
                    classname = classname.replace('.' + extractedFunction, '')
                    console.log('[monitorAllClasses]: ' + classname + '.' + extractedFunction)
                    try {
                        monitorClass(classname, extractedFunction)
                    } catch (err) {
                        console.log('monitorAllClasses err:', err)
                    }
                }
            }
        }, onComplete: function () { }
    });
}

if (Java.available) {
    Java.perform(function () {
        // Your options:
        // monitorFunction('com.package','Class','Func')
        // monitorClass('com.package','Class')
        // monitorAllClasses('AnyString')
    });
}
