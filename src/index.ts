import { qsParser } from "./parseFilterString";
import { ssParser } from "./parseSortString";
import { IParserObj } from "./parseFilterString";
/*
 * Returns and array of objects that represent a set of query parameters based on mongodb node driver
 * [<query>,[*<projection>, ...keys]]
 */
export interface IReqQuery {
    filter?: string;
    sort?: string;
    limit?: number;
    skip?: number;
    project?: string;
}
export interface IParsedObject {
    filter: IParserObj;
    sort?: string | (Array<string | Array<string>>);
    limit?: number;
    skip?: number;
    project?: {[key: string]: 0 | 1};
}
let checkNumber = (arg) => isNaN(Number(arg)) ? null : +arg;
let getProjection = (str: string) => {
    let splObj = str.split(",");
    let returnObj = {};
    splObj.forEach(item => {
        let include = item.trim() !== "_id" ? 1 : 0;
        returnObj[ item.trim() ] = include;
    });
    return returnObj;
};

let command = {
    filter:  qsParser(),
    limit:   checkNumber,
    sort:    ssParser,
    skip:    checkNumber,
    project: getProjection
};

export function ParseMongo (reqQuery: IReqQuery | string): IParsedObject {
    let returnObj = {
        filter: {}
    };
    if (typeof reqQuery === "string") {
        returnObj[ "filter" ] = decodeURIComponent(reqQuery[ "filter" ]);
    }
    else {
        for ( const key in reqQuery ) {
            if ( command.hasOwnProperty(key) ) {
                let action = command[ key ];
                returnObj[ key ] = action(decodeURIComponent(reqQuery[ key ]));
            }
        }
    }
    return returnObj;
}
function queryToString(obj: any){
    if(Object.keys(obj).length === 0){
        return null;
    }
    else{

    }
}
export const toQueryObject = <any>ParseMongo;



