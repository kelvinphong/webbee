export class GlobalHelper {
    static isEmptyObject(obj: any): boolean {
        return !obj || (obj && (Object.keys(obj).length === 0));
    }

    static isEmpty(obj: any, key: string): boolean {
        return !obj || (obj && !obj.hasOwnProperty(key));
    }

    static set(obj: any, path: any, value: any) {
        if (Object(obj) !== obj) {
            return obj; // When obj is not an object
        }
        // If not yet an array, get the keys from the string-path
        if (!Array.isArray(path)) {
            path = path.toString().match(/[^.[\]]+/g) || [];
        }

        path.slice(0, -1).reduce((a: any, c: any, i: number) => // Iterate all of them except the last one
             Object(a[c]) === a[c] // Does the key exist and is its value an object?
                 // Yes: then follow that path
                 ? a[c]
                 // No: create the key. Is the next key a potential array-index?
                 : a[c] = Math.abs(path[i + 1])>>0 === +path[i + 1]
                       ? [] // Yes: assign a new array object
                       : {}, // No: assign a new plain object
             obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
        return obj; // Return the top-level object to allow chaining
    }

    static get(object: any, keys: any, defaultVal?: any): any {
        if (!object || object === null) { return defaultVal; }
        keys = Array.isArray(keys) ? keys : keys.split('.');
        object = object[keys[0]];
        if (object && keys.length > 1) {
          return this.get(object, keys.slice(1));
        }

        return object === undefined ? defaultVal : object;
    }

    static clone(object: any) {
        return JSON.parse(JSON.stringify(object));
      }

    static empty(mixedVar: any): boolean {
        var undef: any
        var key: any
        var i: number
        var len: number
        var emptyValues = [undef, null, false, 0, '', '0']

        for (i = 0, len = emptyValues.length; i < len; i++) {
            if (mixedVar === emptyValues[i]) {
                return true
            }
        }

        if (typeof mixedVar === 'object') {
            for (key in mixedVar) {
                if (mixedVar.hasOwnProperty(key)) {
                    return false
                }
            }
            return true
        }
        return false
    }

    static convertTimestampToDate(ts: number) {
        const myDate = new Date(ts * 1000);
        return new Date(Date.UTC(
            myDate.getFullYear(),
            myDate.getMonth(),
            myDate.getDate(),
            myDate.getHours(),
            myDate.getMinutes(),
            myDate.getSeconds()
        ));
    }

    static convert2ClientDate(val: any) {
        return typeof val === 'string' ? val : new Date(val * 1000);
    }

    static multiDimensionalUnique(arr: string | any, key: string) {
        var uniques = [];
        var itemsFound: any = {};
        for(var i = 0, l = arr.length; i < l; i++) {
            var stringified = arr[i][key];
            if (itemsFound[stringified]) { continue; }
            uniques.push(arr[i]);
            itemsFound[stringified] = true;
        }
        return uniques;
    }

    static isInObject(value:any, key: string, object: any) {
        let rs = false;
        if (!this.empty(object)) {
            for(let item of object) {
                if (!this.empty(item[key]) && item[key] == value) {
                    rs = true;
                    break;
                }
            }
        }
        return rs;
    }

    static arrayPluck(array: any, path: string): any[] {
        var result: any[] = [];
    
        if (!Array.isArray(array)) { return result; }
        
        array.forEach(o => {
            result.push(this.get(o, path));
        });
    
        return result;
    }

    static intersection(array1: any[], array2: any[]): any[] {
        var result: any[] = [];
        if (!Array.isArray(array1) || !Array.isArray(array2)) { return result; }
        array2.forEach(o => {
            if (array1.indexOf(o) > -1) {
                result.push(o);
            }
        });

        return result;
    }

    static withoutProperty(obj: any, property: string) {
        const { [property]: unused, ...rest } = obj;
        return rest;
    }

    static omit(obj: any, keys: any[]) {
        keys.map((key: string) => {
            obj = this.withoutProperty(obj, key);
        });
        
        return obj;
    }

    static pick(obj: any, keys: any[]) {
        const result = {};
        keys.map((key: string) => {
            Object.assign(result, { [key]: this.get(obj, key, null) });
        });

        return result;
    }
}
