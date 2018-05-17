import {qsParser, IParserObj} from './queryStringParser';
import {valuesRegExp} from "../regExp";
let rpl=valuesRegExp.replace;
let tst=valuesRegExp.test;
let mtch=valuesRegExp.match;
export type TValue = RegExp | string | number | Array<string | number | RegExp> | IParserObj;
export function setValue (obj: string, operator: string): TValue {
    let value: TValue;
    let qArr: RegExpMatchArray = mtch.arrayFromComma(obj);
    let OperatorsWithArray=["$in","$nin","$mod","$all","$slice"];
    if ( OperatorsWithArray.indexOf(operator) > -1 ) {
        // strings must be wrapped in '' numbers are not
        value = [ qArr.length ] as Array<string | number>;
        qArr.map((item, idx) => {
            value[ idx ] = checkType(item);
        });
    }
    else if(operator=="$elemMatch"){
        let vString=mtch.extractValue(obj)[0].trim();
        let elemString= rpl.trimCurlysFromLogicalOps(vString);
        return qsParser()(rpl.trimQuote(elemString))
    }
    else {
        let str: string = mtch.extractValue(obj)[0].trim();
        const compare = {
            "true":  true,
            "false": false
        };

        value = compare[ str ] || str === "false" ? compare[ str ] : checkType(str);
        if ((operator === "$gt" || operator === "$gte") && typeof value === "string"  ) {
            if(!value || value.match(/^\s+$/))
                return "~";
        }
    }
    // prevent mongoinjection

    return value;
}

function checkType(str): string | number | RegExp | Date{
    let cleanStr = rpl.trimQuote(str)
    if(tst.isRegExString(cleanStr)){
        let regExp= rpl.getRegExString(cleanStr);
        let options =  rpl.getRegExOptions(cleanStr);
        return new RegExp(regExp,options) as RegExp;
    }
    else{
        if(tst.isDateParserString(cleanStr)){
            return new Date(rpl.getDateString(cleanStr))
        }
        return isNaN(Number(str)) ? cleanStr : +str as string | number;
    }
}
