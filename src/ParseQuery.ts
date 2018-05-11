import {qsParser} from "./parseFilterString";
import {ssParser} from "./parseSortString";
import {IParserObj} from "./parseFilterString";
import {getProjection} from "./parseProjectionString"
import {sympatico} from "./utils"
/*
 * Returns and array of objects that represent a set of query parameters based on mongodb node driver
 * [<query>,[*<projection>, ...keys]]
 */
export interface IReqQuery {
    filter?: string;
    $filter?: string;
    $top?:number;
    sort?: string;
    limit?: number;
    skip?: number;
    project?: string;
    projection?: string;
}
export interface IParsedObject {
    filter: IParserObj;
    sort?: string | (Array<string | Array<string>>);
    limit?: number;
    skip?: number;
    project?: {[key: string]: 0 | 1 | string | IElemMatchObject };
    projection?: {[key: string]: 0 | 1 | string | IElemMatchObject };
}
export interface IElemMatchObject{
    $elemMatch:{[key:string]:any}
}

export function ParseQuery(reqQuery: IReqQuery | string, callback?: (result: IParsedObject) => any): IParsedObject {
    let checkNumber = (arg) => isNaN(Number(arg)) ? null : +arg;
    let command = {
        filter: qsParser(),
        limit: checkNumber,
        sort: ssParser,
        skip: checkNumber,
        project: getProjection,
        projection: getProjection
    };
    let returnObj = {
        filter: {}
    };

    if (typeof reqQuery === "string") {
        returnObj["filter"] = command.filter(decodeURIComponent(reqQuery));
    }
    else {
        for (let key in reqQuery) {
            let newKey = sympatico(key);

            if (command.hasOwnProperty(newKey) && reqQuery[key] !== undefined) {
                let action = command[newKey];
                returnObj[newKey] = action(decodeURIComponent(reqQuery[key]));
            }
        }
    }
    return callback ? callback(returnObj) : returnObj;
}