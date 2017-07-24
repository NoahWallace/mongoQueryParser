import {upDown} from '../utils';
import {valuesRegExp} from "../regExp";
declare type TSortString = 1 | -1;

export function ssParser (str: string, isAggregateQuery): string | Array<string | Array<string>> | any {
    let returnObj = isAggregateQuery ? {} : [];
    let orig=valuesRegExp.replace.trimQuote(str);
    let spl = orig.split(",");
    let single = false;
    spl.map(item => {
        let splItem = item.trim().split(/\s+/);
        let key=valuesRegExp.replace.trimQuoteAndReplaceSlash(splItem[0]);
        if ( splItem.length > 1 ) {
            if(isAggregateQuery) {returnObj[key]=upDown(splItem[1]);}
            else{(returnObj as Array<any>).push([key,upDown(splItem[1])]);  }

        }
        else {
            if(isAggregateQuery){
                returnObj[key]= 1
            }
            else {
                (returnObj as Array<any>).push(key); // [key]
                single = splItem[0].length === 1 ;
            }
        }

    });
    if ( single ) return returnObj[ 0 ];
    else return returnObj;
}

