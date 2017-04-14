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
            let projection=item.split(/\s/);
            let p=projection
                .filter((item)=>{return item.trim() !== ''})
                .map((item)=>{
                    return item;
            })

            p.length > 1 ?
                returnObj[ p[0].trim() ] = p[1].trim() :
                returnObj[ p[0].trim() ] = p[0].trim() === "_id" ? 0 : 1;
        }
    });
    return returnObj;
};
