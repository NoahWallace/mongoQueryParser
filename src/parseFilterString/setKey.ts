export interface IKeyObj {
    checkExists?: boolean;
    key: string;
}

export function setKey (str: string): IKeyObj {
    let keyString: RegExp = new RegExp(/(^(\s*!?has\s+)?([^\s]+)|(^\s*[^\s]+))/i);
    let keyObj: IKeyObj = {
        key:         null
    }

    let key = str.match(keyString)[ 0 ].trim().replace(/(^'|'$)/g, "");
    if ( key.startsWith("has ") ) {
        keyObj.checkExists = true;
    }
    else if ( key.startsWith("!has ") ) {

        keyObj.checkExists = false;
    }
    keyObj.key = key.replace(/^(!?has\s+)/, "").trim();
    return keyObj;

}