import {IReqQuery, IParsedObject, ParseQuery} from "./ParseQuery";
interface Window {
    ParseQuery:(reqQuery: IReqQuery | string)=>IParsedObject
}
declare let window:Window;

(function () {
    if (typeof module !== "undefined" && module.exports && typeof window === 'undefined') {}
    else { window.ParseQuery = ParseQuery;}
})();

export {ParseQuery};

