import { getValueObject } from "./getValueObject";

export interface IParserObj {
    "$or"?: Array<string | IParserObj>;
    "$and"?: Array<string | IParserObj>;
    "$nor"?: Array<string | IParserObj>;
    [key: string]: INotOperator| IOperators | number | string;
}
export interface INotOperator {
    "$not": IOperators;
}
export interface IOperators {
    "$in"?: Array<string | number>;
    "$nin"?: Array<string | number>;
    "$eq"?: number | string;
    "$gt"?: number | string;
    "$gte"?: number | string;
    "$lt"?: number | string;
    "$lte"?: number | string;
    "$ne"?: number | string;

}

export function qsParser (): (str: string) => IParserObj {
    let memo = <any>{};
    let regExOr: RegExp = new RegExp(/ OR /g);
    let regExAnd: RegExp = new RegExp(/ AND /g);
    let regExNor: RegExp = new RegExp(/ NOR /g);

    function getSplit (obj: string, regex: RegExp): Array<IParserObj> {
        let spl: Array<string> = obj.split(regex);
        return spl.map(item => {
            return  parser(item.trim());
        });

    }

    function parser (str: string): IParserObj {
        let value: IParserObj;
        if ( str in memo ) {
            return memo[str]
        }
        else {
            if ( regExOr.test(str) ) {
                value = {};
                value[ "$or" ] = getSplit(str, regExOr);
            }
            else if ( regExAnd.test(str) ) {
                value = {};
                value[ "$and" ] = getSplit(str, regExAnd);
            }
            else if ( regExNor.test(str) ) {
                value = {};
                value[ "$nor" ] = getSplit(str, regExNor);
            }
            else {
                value = getValueObject(str);
            }
        }
        memo[str]=value;
        return value;
    };
    return parser;
}

