import {valuesRegExp, keysRegExp, operatorsRegExp} from '../regExp'
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
    };
    let keyStr= str.match(operatorsRegExp.regex.operators);
    let key = vrpl.trimQuoteAndReplaceSlash(str.substring(0,keyStr ? keyStr.index : str.length).trim())

    if ( key.startsWith("has ") ) {
        keyObj.checkExists = true;
    }
    else if ( key.startsWith("!has ") ) {
        keyObj.checkExists = false;
    }
    keyObj.key = krpl.removeHas(key).trim();
    return keyObj;

}