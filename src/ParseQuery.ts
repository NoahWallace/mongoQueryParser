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
export declare namespace ParseQuery{
	export function ParseQuery(reqQuery:IReqQuery):IParsedObject;
	export function ParseQuery(reqQuery:IReqQuery,options?:any):IParsedObject;
	export function ParseQuery(reqQuery:IReqQuery,callback?:(result: IParsedObject)=>any):void;
	export function ParseQuery(reqQuery:IReqQuery, options?:any, callback?:(result: IParsedObject) => any):void;
}


export function ParseQuery(reqQuery: IReqQuery | string, ...args): IParsedObject {
    let checkNumber = (arg) => isNaN(Number(arg)) ? null : +arg;

	const cb = (typeof args[args.length-1] === 'function') ? args.pop() : null;
	const options = (args.length > 0) ? args.shift() : {};
    let defaultOptions={
        sortObject:'array',
            ...options
    }
	let command = {
        filter: qsParser(),
        limit: checkNumber,
        sort: ssParser,
        skip: checkNumber,
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
				let modifier;
                switch(newKey){
                    case "sort":
                        defaultOptions.sortObject === 'object' ?  modifier = true : modifier = false;
                        break;
                    default:
                        modifier= null;
                }

                returnObj[newKey] = action(decodeURIComponent(reqQuery[key]),modifier);
            }
        }
    }
    if(cb) cb(returnObj);
    else return returnObj;

}