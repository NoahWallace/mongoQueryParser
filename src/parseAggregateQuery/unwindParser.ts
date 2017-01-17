import {valuesRegExp, keysRegExp} from "../regExp";
export function unwindParser(str:string){
        let splStr=str.split(",");
        let map = {
            path:                       (val) => /^\$/.test(val) ? val : "$" + val,
            includeArrayIndex:          (val) => /^\$+/.test(val) ? val.replace(/^\$+/, "") : val,
            preserveNullAndEmptyArrays: (val) => val === 'true' ? true : false,
        }


        let returnObj={};

        splStr.map((item)=>{
                let key=keysRegExp.match.getkey(item)[0].trim();
                let value = valuesRegExp.match.extractValue(item)[0].trim();
                if(map.hasOwnProperty(key)) {

                    returnObj[ key ] = map[key](value);
                }

            })
    return returnObj;
}