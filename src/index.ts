import {IReqQuery, IParsedObject, ParseQuery} from "./ParseQuery";
import {ParseAggregate} from './ParseAggregate';
interface Window {
    ParseQuery: (reqQuery: IReqQuery | string) => IParsedObject;
    ParseAggregate: (str: string) => any
}
declare let window: Window;

(function () {
    if (typeof module !== "undefined" && module.exports && typeof window === 'undefined') {
    }
    else {
        window.ParseQuery = ParseQuery;
        window.ParseAggregate = ParseAggregate;
    }
})();

export {ParseQuery, ParseAggregate};

