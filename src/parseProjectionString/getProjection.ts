export function getProjection (str: string) {
    let splObj = str.split(",");
    let returnObj = {
        "_id":0
    };
    splObj.forEach(item => {
        returnObj[ item.trim() ] = 1;
    });
    return returnObj;
};
