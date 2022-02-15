import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";

// RAW Encrypt Data
export function toPlain(obj) {
    if (!obj) return null
    let plainObj = {}

    try {
        // console.log('Type of obj = ', typeof obj, ' is array ? ', obj instanceof Array, obj);
        // if (typeof obj == 'object') {
        //     for (const [key, value] of Object.entries(obj)) {
        //         console.log(`${key}: ${value}`);
        //       }
        // }
    }
    catch (e) {
    }

    if (obj instanceof Array) plainObj = Object.assign([], obj)
    else {
        if (BigNumber.isBigNumber(obj)) {
            return obj.toString() + ' => ' + ethers.utils.formatEther(obj.toString());
        }
        else if (typeof obj === 'number') return obj.toString();
        else if (typeof obj === 'string') return obj;
        else plainObj = Object.assign({}, obj)
    }

    for (const [key, value] of Object.entries(obj)) {
        console.log(`--> ${key}: ${value}`);

        if (key == 'timestamp') {
            // convert unix timestamp to Date
            plainObj[key] = new Date(value * 1000);
        }
        else if (BigNumber.isBigNumber(value)) {
            plainObj[key] = value.toString() + ' => ' + ethers.utils.formatEther(value.toString());
        }
        else if (typeof value === "object") {
          plainObj[key] = toPlain(value);
        }
        else {
            plainObj[key] = String(value)
        }
    }

    // for (var key in obj) {
    //     if (key == 'timestamp') {
    //         // convert unix timestamp to Date
    //         plainObj[key] = new Date(obj[key] * 1000);
    //     }
    //     else if (BigNumber.isBigNumber(obj[key])) {
    //         plainObj[key] = obj[key].toString() + ' => ' + ethers.utils.formatEther(obj[key].toString());
    //     }
    //     else if (typeof obj[key] === "object") {
    //       plainObj[key] = toPlain(obj[key]);
    //     }
    //     else {
    //         plainObj[key] = String(obj[key])
    //     }
    // }
    return plainObj;
}

export function enumeratableObject(obj, spacer='  ', depth=0) {
    if (!obj) return ''

    let ret = '';
    let nl = '\n';

    try {
        if (obj instanceof Array) ret += `[${nl}`;
        else {
            if (BigNumber.isBigNumber(obj)) {
                return obj.toString() + ' => ' + ethers.utils.formatEther(obj.toString());
            }
            else if (typeof obj === 'number') return obj.toString();
            else if (typeof obj === 'string') return obj;
            else ret += `{${nl}`;
        }
    
        let isStart = true;
        for (const [key, value] of Object.entries(obj)) {
            if (isStart) {
                isStart = false;
            }
            else {
                ret += `,${nl}`;
            }

            for (let i=0; i<depth+2; i++) ret += spacer;
            ret += `${key}: `
    
            if (key == 'timestamp') {
                // convert unix timestamp to Date
                ret += `${value} => ` + (new Date(value * 1000)).toString();
            }
            else if (BigNumber.isBigNumber(value)) {
                ret += value.toString() + ' => ' + ethers.utils.formatEther(value.toString());
            }
            else if (typeof value === "object") {
                ret += enumeratableObject(value, depth+1);
            }
            else {
                ret += String(value)
            }
        }

        if (obj instanceof Array) ret += `${nl}]`;
        else ret += `${nl}}`
    }
    catch (e) {
        console.log(e);
    }

    return ret;
}
