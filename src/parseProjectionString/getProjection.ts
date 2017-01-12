import { getValueObject } from "../parseFilterString/getValueObject";
export function getProjection (str: string) {
    let splObj = str.split(",");
    let returnObj = {
        "_id": 0
    };
    splObj.forEach(item => {
        let contains = / contains /i;
        if ( contains.test(item) ) {
            let elemMatch = getValueObject(item)
            for ( let key in elemMatch ) {
                returnObj[ key ] = elemMatch[ key ];
            }
        }
        else {
            returnObj[ item.trim() ] = 1;
        }
    });
    return returnObj;
};
