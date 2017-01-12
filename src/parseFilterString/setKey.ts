import {valuesRegExp, keysRegExp} from '../regExp'
let vrpl = valuesRegExp.replace;
let krpl =  keysRegExp.replace;
let kmtch = keysRegExp.match;
export interface IKeyObj {
    checkExists?: boolean;
    key: string;
}

export function setKey (str: string): IKeyObj {
    let keyObj: IKeyObj = {
        key:         null
    }

    let key = vrpl.trimQuote(kmtch.getkey(str)[ 0 ].trim())
    if ( key.startsWith("has ") ) {
        keyObj.checkExists = true;
    }
    else if ( key.startsWith("!has ") ) {
        keyObj.checkExists = false;
    }
    keyObj.key = krpl.removeHas(key).trim();
    return keyObj;

}