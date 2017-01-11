export interface IOperatorObj {
    falsy: boolean;
    operator: string;
}

export function setOperator (str: string): IOperatorObj {
    let regexOperator: RegExp = new RegExp(/\s+(not)*\s*(eq|gt|gte|lt|lte|ne|in|nin)\s+/);
    let operator = str.match(regexOperator) ? str.match(regexOperator)[ 0 ].trim() : null;
    let operatorObj: IOperatorObj = {
        falsy:    false,
        operator: null
    }
    if ( operator ) {
        if ( operator.startsWith("not ") ) {
            operatorObj.falsy = true;
        }
        operatorObj.operator = "$" + operator.replace(/^not\s+/i, "").toLowerCase();
    }
    return operatorObj;
}