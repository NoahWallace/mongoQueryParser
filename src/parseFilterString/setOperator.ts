import {operatorsRegExp} from '../regExp';
let tst=operatorsRegExp.test;
let mtch=operatorsRegExp.match;
let rpl= operatorsRegExp.replace;
export interface IOperatorObj {
    falsy: boolean;
    operator: string;
}

export function setOperator (str: string): IOperatorObj {
    let operator = tst.hasOperator(str) ? mtch.getOperator(str)[ 0 ].trim() : null;
    let operatorObj: IOperatorObj = {
        falsy:    false,
        operator: null
    }
    if ( operator ) {
        if ( operator.startsWith("not ") ) {
            operatorObj.falsy = true;
        }
        operatorObj.operator = "$" + stripOperator(operator);
    }
    return operatorObj;
}

function stripOperator(str:string):string{
    let pairs={
        "is":"type",
        "contains":"elemMatch",
        "join":"lookup"
    };
    return rpl.removeNot(pairs[str] || str);
}