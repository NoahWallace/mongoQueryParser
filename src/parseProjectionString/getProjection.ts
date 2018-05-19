import {getValueObject} from "../parseFilterString/getValueObject";

export function getProjection(str: string) {

    let returnObj   = {};
    let includes    = 1;
    let modifierExp = /^\s*(include|exclude|incl|excl)\s+/i;
    if ( modifierExp.test(str) ) {
        if ( /^\s*(exclude|excl)\s+/i.test(str) ) {
            includes = 0;
        }
        str = str.replace(modifierExp, "");
    }

    let splObj = str.split(",");

    splObj.forEach((item, i, arr) => {
        let contains = / contains /i;
        if ( contains.test(item) ) {
            let elemMatch = getValueObject(item);

            for ( let key in elemMatch ) {
                returnObj[ key ] = elemMatch[ key ];
            }
        }
        else {
            let projection = item.split(/\s/);

            let p = projection.filter((item) => {
                    return item.trim() !== "";
                }).map((item) => {
                    return item;
                });
            if ( p.length > 1 ) {
                returnObj[ p[ 0 ].trim() ] = p[ 1 ].trim();
            }
            else if ( includes === 1 && arr.length > 1 && p[ 0 ].trim() === "_id" ) {
                returnObj[ p[ 0 ].trim() ] = 0;
            }
            else {
                returnObj[ p[ 0 ].trim() ] = includes;
            }

        }
    });

    return returnObj;
};
