export interface IOperatorObj {
    falsy: boolean;
    operator: string;
}

export function setOperator (str: string): IOperatorObj {
    let regexOperator: RegExp = new RegExp(/\s+(not)*\s*(eq|gt|gte|lt|lte|ne|in|nin|is|type|mod|regex|all|size)\s+/);
    let operator = regexOperator.test(str) ? str.match(regexOperator)[ 0 ].trim() : null;
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
        "is":"type"
    };
    let stripPrefix=(str:string):string=> str.replace(/^not\s+/i, "");
    return stripPrefix( pairs[str] || str).toLowerCase();
}