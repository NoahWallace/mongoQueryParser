import {qsParser} from "./parseFilterString";
import {ssParser} from "./parseSortString";
import {IParserObj} from "./parseFilterString";
import {getProjection} from "./parseProjectionString"
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


export function ParseQuery(reqQuery: IReqQuery | string, callback?: (result: IParsedObject) => any): IParsedObject {
    let checkNumber = (arg) => isNaN(Number(arg)) ? null : +arg;
    let command = {
        filter: qsParser(),
        limit: checkNumber,
        sort: ssParser,
        skip: checkNumber,
        project: getProjection
    };
    let returnObj = {
        filter: {}
    };
    if (typeof reqQuery === "string") {
        returnObj["filter"] = command.filter(decodeURIComponent(reqQuery));
    }
    else {
        for (const key in reqQuery) {
            if (command.hasOwnProperty(key) && reqQuery[key] !== undefined) {
                let action = command[key];
                returnObj[key] = action(decodeURIComponent(reqQuery[key]));
            }
        }
    }
    return callback ? callback(returnObj) : returnObj;
}