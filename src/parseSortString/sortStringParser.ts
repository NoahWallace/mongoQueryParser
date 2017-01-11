
declare type TSortString = "asc" | "desc";

export function ssParser (str: string): string | Array<string | Array<string>> {
    let returnObj = [];
    let spl = str.split(",");
    let single = false;
    spl.map(item => {
        let splItem = item.trim().split(/\s+/);
        if ( splItem.length > 1 ) {
            returnObj.push(splItem); //[key, TSortString]
        }
        else {
            returnObj.push(splItem[ 0 ]); // [key]
            single = splItem[0].length === 1 ;
        }

    });
    if ( single ) return returnObj[ 0 ];
    else return returnObj;
}
