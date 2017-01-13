import { qsParser } from "./parseFilterString";
import { ssParser } from "./parseSortString";
import { IParserObj } from "./parseFilterString";
import { getProjection } from "./parseProjectionString";
import { aqParser } from "./parseAggregateQuery";
import {checkNumber} from "./utils";
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


export function ParseQuery (reqQuery: IReqQuery | string): IParsedObject {
    let command = {
        filter:  qsParser(),
        limit:   checkNumber,
        sort:    ssParser,
        skip:    checkNumber,
        project: getProjection
    };
    let returnObj = {
        filter: {}
    };
    if ( typeof reqQuery === "string" ) {
        returnObj[ "filter" ] = command.filter(decodeURIComponent(reqQuery));
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

export function ParseAggregate (str: string): Array<any> {
    // match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last,name'
    let parser = aqParser()
    let agg = str.split(/ THEN /);
    let returnObj = new Array(agg.length);
    agg.map((item, idx) => {returnObj[idx]= parser(item);})

    return returnObj;
}


