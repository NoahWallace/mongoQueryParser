import {typeIs} from "../utils"
export function flattenObj() {
    let memo = {};

    return (obj: any, currentString?:string)=> {
        let str = "";

        if (obj in memo) {
            return memo[obj]
        }
        for (let key in obj) {
            let prev=key;
            if (typeIs(obj[key], "object")) {
                str += `${currentString ? currentString+"." : key + "|" }${flattenObj()(obj[key], key)}`
            }
            else {
                str +=`${currentString ? currentString+"." : key + "|" }${key}|`
            }
        }
        return str;
    }
}


let t={
    name:{
        first:"string",
        last:"string",
        middle:{
            init:"a",
            preferred:"b"
        }
    },
    address:{
        touche:"123"
    }
}

console.log(flattenObj()(t))