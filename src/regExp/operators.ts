export const operatorsRegExp = {
    regex:{
        operators:new RegExp(/\s+(not)*\s*(eq|gt|gte|lt|lte|ne|in|nin|is|type|mod|regex|all|size|contains)\s+/)
    },
    test:{
      hasOperator: (str:string) => operatorsRegExp.regex.operators.test(str)
    },
    match:{
        getOperator: (str:string) => str.match(operatorsRegExp.regex.operators)
    },
    replace:{
        removeNot: (str:string) => str.replace(/^not\s+/i, "")
    }
};