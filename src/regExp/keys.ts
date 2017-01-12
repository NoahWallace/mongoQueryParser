export const keysRegExp = {

    match:{
        getkey: (str:string) => str.match(/(^(\s*!?has\s+)?([^\s]+)|(^\s*[^\s]+))/i)
    },
    replace:{
        removeHas: (str:string) => str.replace(/^(!?has\s+)/, "")
    }
};