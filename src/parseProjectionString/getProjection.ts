export function getProjection (str: string) {
    let splObj = str.split(",");
    let returnObj = {};
    splObj.forEach(item => {
        let include = item.trim() !== "_id" ? 1 : 0;
        returnObj[ item.trim() ] = include;
    });
    return returnObj;
};
