export function sympatico(v:string){
    let strippedV= v.replace(/^\$/,"").toLowerCase();
    let replObj={
        "true":true,
        "false": false,
        "select": "projection",
        "project": "projection",
        "orderby": "sort",
        "top": "limit",
    }
    return replObj[strippedV] || strippedV;
}