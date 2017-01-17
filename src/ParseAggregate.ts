import {aqParser} from './parseAggregateQuery';

export function ParseAggregate (str: string): Array<any> {
    // match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last,name'
    let parser = aqParser()
    let agg = str.split(/ THEN /);
    let returnObj = new Array(agg.length);
    agg.forEach((item, idx) => {returnObj[idx]= parser(item);})

    return returnObj
}
