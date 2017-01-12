import { typeIs } from "../utils";
import { setValue } from "./setValue";
import { setKey, IKeyObj } from "./setKey";
import { setOperator, IOperatorObj } from "./setOperator";
import {TValue} from './setValue';

export function getValueObject (currentString: string) {

    let operatorObj: IOperatorObj = setOperator(currentString);
    let keyObj: IKeyObj = setKey(currentString);

    let resultObj = <any>{};

    let value: TValue = setValue(currentString, operatorObj.operator);
    let operatorPair = {[operatorObj.operator]: value};
    if ( keyObj.hasOwnProperty("checkExists") ) {
        resultObj[ keyObj.key ] = {
            "$exists": keyObj.checkExists
        };
    }

    if ( resultObj[ keyObj.key ] && resultObj[ keyObj.key ].hasOwnProperty("$exists") ) {
        if ( resultObj[ keyObj.key ][ "$exists" ] && operatorObj.operator) {
            if ( operatorObj.falsy ) {
                resultObj[ keyObj.key ][ "$not" ] = operatorPair;
            }
            else {
                resultObj[ keyObj.key ][ operatorObj.operator ] = value;
            }
        }
    }
    else {
        resultObj[ keyObj.key ] = operatorObj.falsy ? {"$not": operatorPair} : operatorPair;
    }

    return resultObj;
}



