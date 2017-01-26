import {upDown} from '../utils';
import {valuesRegExp} from "../regExp";
declare type TSortString = 1 | -1;

export function ssParser (str: string): string | Array<string | Array<string>> {
    let returnObj = [];
    let orig=valuesRegExp.replace.trimQuote(str);
    let spl = orig.split(",");
    let single = false;
    spl.map(item => {
        let splItem = item.trim().split(/\s+/);
        let key=valuesRegExp.replace.trimQuoteAndReplaceSlash(splItem[0]);
        if ( splItem.length > 1 ) {

            returnObj.push([key,upDown(splItem[1])]); //[key, TSortString]
        }
        else {
            returnObj.push(key); // [key]
            single = splItem[0].length === 1 ;
        }

    });
    if ( single ) return returnObj[ 0 ];
    else return returnObj;
}
