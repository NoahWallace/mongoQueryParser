import {aqParser} from './parseAggregateQuery';
export interface IParseAggregate{
    $match?:   any,
    $sort?:    Array<Array<string> | string>,
    $project?: any,
    $limit?:   number,
    $skip?:    number,
    $unwind?:  any,
}
export function ParseAggregate (str: string, callback?:(response)=>any): Array<IParseAggregate> {
    // match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last,name'
    let parser = aqParser()
    let agg = str.split(/ THEN /);
    let returnObj = new Array(agg.length);
    agg.forEach((item, idx) => {returnObj[idx]= parser(item);})

    return returnObj
}
