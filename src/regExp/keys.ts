export interface IKeyObj {
    mod?: string;
    key: string;
    op: string;
    val: string;
}
export const keysRegExp = {

    match:   {
        getkey: (str:string) => str.match(/(^(\s*!?has\s+)?([^\s]+)|(^\s*[^\s]+))/i)
        //getkey: (str:string) => str.match(/('[^']*'\s*,?\s*)+|\S+/g)

    },
    replace: {
        removeHas: (str: string) => str.replace(/^(!?has\s+)(?=.+)/, "")
    }
};