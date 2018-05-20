/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ParseQuery_1 = __webpack_require__(1);
var ParseAggregate_1 = __webpack_require__(21);
(function () {
    if (typeof module !== "undefined" && module.exports && typeof window === 'undefined') {
    }
    else {
        window.ParseQuery = ParseQuery_1.ParseQuery;
        window.ParseAggregate = ParseAggregate_1.ParseAggregate;
    }
})();
__export(__webpack_require__(1));
__export(__webpack_require__(21));
var utils_1 = __webpack_require__(14);
exports.typeIs = utils_1.typeIs;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parseFilterString_1 = __webpack_require__(2);
var parseSortString_1 = __webpack_require__(12);
var parseProjectionString_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(14);
function ParseQuery(reqQuery, callback) {
    var checkNumber = function (arg) { return isNaN(Number(arg)) ? null : +arg; };
    var command = {
        filter: parseFilterString_1.qsParser(),
        limit: checkNumber,
        sort: parseSortString_1.ssParser,
        skip: checkNumber,
        projection: parseProjectionString_1.getProjection
    };
    var returnObj = {
        filter: {}
    };
    if (typeof reqQuery === "string") {
        returnObj["filter"] = command.filter(decodeURIComponent(reqQuery));
    }
    else {
        for (var key in reqQuery) {
            var newKey = utils_1.sympatico(key);
            if (command.hasOwnProperty(newKey) && reqQuery[key] !== undefined) {
                var action = command[newKey];
                returnObj[newKey] = action(decodeURIComponent(reqQuery[key]));
            }
        }
    }
    return callback ? callback(returnObj) : returnObj;
}
exports.ParseQuery = ParseQuery;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getValueObject_1 = __webpack_require__(4);
function qsParser() {
    var memo = {};
    var regExOr = new RegExp(/ OR (?=(?![^(]*\)))/g);
    var regExAnd = new RegExp(/ AND (?=(?![^(]*\)))/g);
    var regExNor = new RegExp(/ NOR (?=(?![^(]*\)))/g);
    function getSplit(obj, regex) {
        var spl = obj.split(regex);
        return spl.map(function (item) {
            return parser(item.trim());
        });
    }
    function parser(str) {
        var value;
        if (str in memo) {
            return memo[str];
        }
        else {
            if (regExOr.test(str)) {
                value = {};
                value["$or"] = getSplit(str, regExOr);
            }
            else if (regExAnd.test(str)) {
                value = {};
                value["$and"] = getSplit(str, regExAnd);
            }
            else if (regExNor.test(str)) {
                value = {};
                value["$nor"] = getSplit(str, regExNor);
            }
            else {
                value = getValueObject_1.getValueObject(str);
            }
        }
        memo[str] = value;
        return value;
    }
    ;
    return parser;
}
exports.qsParser = qsParser;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var setValue_1 = __webpack_require__(5);
var setKey_1 = __webpack_require__(10);
var setOperator_1 = __webpack_require__(11);
function getValueObject(currentString) {
    var operatorObj = setOperator_1.setOperator(currentString);
    var keyObj = setKey_1.setKey(currentString);
    var resultObj = {};
    var value = setValue_1.setValue(currentString, operatorObj.operator);
    var operatorPair = (_a = {}, _a[operatorObj.operator] = value, _a);
    if (keyObj.hasOwnProperty("checkExists")) {
        resultObj[keyObj.key] = {
            "$exists": keyObj.checkExists
        };
    }
    if (resultObj[keyObj.key] && resultObj[keyObj.key].hasOwnProperty("$exists")) {
        if (resultObj[keyObj.key]["$exists"] && operatorObj.operator) {
            if (operatorObj.falsy) {
                resultObj[keyObj.key]["$not"] = operatorPair;
            }
            else {
                resultObj[keyObj.key][operatorObj.operator] = value;
            }
        }
    }
    else {
        resultObj[keyObj.key] = operatorObj.falsy ? { "$not": operatorPair } : operatorPair;
    }
    return resultObj;
    var _a;
}
exports.getValueObject = getValueObject;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var queryStringParser_1 = __webpack_require__(3);
var regExp_1 = __webpack_require__(6);
var rpl = regExp_1.valuesRegExp.replace;
var tst = regExp_1.valuesRegExp.test;
var mtch = regExp_1.valuesRegExp.match;
function setValue(obj, operator) {
    var value;
    var qArr = mtch.arrayFromComma(obj);
    var OperatorsWithArray = ["$in", "$nin", "$mod", "$all", "$slice"];
    if (OperatorsWithArray.indexOf(operator) > -1) {
        // strings must be wrapped in '' numbers are not
        value = [qArr.length];
        qArr.map(function (item, idx) {
            value[idx] = checkType(item);
        });
    }
    else if (operator == "$elemMatch") {
        var vString = mtch.extractValue(obj)[0].trim();
        var elemString = rpl.trimCurlysFromLogicalOps(vString);
        return queryStringParser_1.qsParser()(rpl.trimQuote(elemString));
    }
    else {
        var str = mtch.extractValue(obj)[0].trim();
        var compare = {
            "true": true,
            "false": false
        };
        value = compare[str] || str === "false" ? compare[str] : checkType(str);
        if ((operator === "$gt" || operator === "$gte") && typeof value === "string") {
            if (!value || value.match(/^\s+$/))
                return "~";
        }
    }
    // prevent mongoinjection
    return value;
}
exports.setValue = setValue;
function checkType(str) {
    var cleanStr = rpl.trimQuote(str);
    if (tst.isRegExString(cleanStr)) {
        var regExp = rpl.getRegExString(cleanStr);
        var options = rpl.getRegExOptions(cleanStr);
        return new RegExp(regExp, options);
    }
    else {
        if (tst.isDateParserString(cleanStr)) {
            return new Date(rpl.getDateString(cleanStr));
        }
        return isNaN(Number(str)) ? cleanStr : +str;
    }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(7));
__export(__webpack_require__(8));
__export(__webpack_require__(9));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorsRegExp = {
    regex: {
        operators: new RegExp(/\s+(not)*\s*(eq|gt|gte|lt|lte|ne|in|nin|is|type|mod|regex|all|size|contains|lookup)\s+/)
    },
    test: {
        hasOperator: function (str) { return exports.operatorsRegExp.regex.operators.test(str); }
    },
    match: {
        getOperator: function (str) { return str.match(exports.operatorsRegExp.regex.operators); }
    },
    replace: {
        removeNot: function (str) { return str.replace(/^not\s+/i, ""); }
    }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.valuesRegExp = {
    match: {
        arrayFromComma: function (str) { return str.match(/((\d+)(?=\s*,*\s*)|(('.+?')(?=\s*,\s*)|('.+'$)))/ig); },
        extractValue: function (str) { return str.match(/(('.+')+(,'.+')*|\s{1}\S+$)/i); },
    },
    replace: {
        trimCurlyBraces: function (str) { return str.replace(/(^\{|\}$)/g, ""); },
        trimQuote: function (str) { return str.replace(/(^'|'$)/g, ""); },
        getRegExString: function (str) { return str.replace(/(^\/|\/([gim]*)?$)/g, ""); },
        getRegExOptions: function (str) { return str.replace(/(^\/.+\/)(?=[gim]?)/, ""); },
        trimQuoteAndReplaceSlash: function (str) { return exports.valuesRegExp.replace.trimQuote(str.replace(/\//g, ".")); },
        trimCurlysFromLogicalOps: function (str) {
            return str.replace(/\{(AND|OR|NOR){1}\}/g, function (match) {
                return exports.valuesRegExp.replace.trimCurlyBraces(match);
            });
        },
        getDateString: function (str) { return str.replace(/^Date\(([0-9:a-zA-Z\-.]*)\)$/, "$1"); },
    },
    test: {
        isRegExString: function (str) { return /(^\/|\/([gim]*)?$)/g.test(str); },
        isDateParserString: function (str) { return /^Date\(([0-9:a-zA-Z\-.]*)\)$/.test(str); },
    },
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.keysRegExp = {
    match: {
        getkey: function (str) { return str.match(/(^(\s*!?has\s+)?([^\s]+)|(^\s*[^\s]+))/i); }
        //getkey: (str:string) => str.match(/('[^']*'\s*,?\s*)+|\S+/g)
    },
    replace: {
        removeHas: function (str) { return str.replace(/^(!?has\s+)(?=.+)/, ""); }
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var regExp_1 = __webpack_require__(6);
var vrpl = regExp_1.valuesRegExp.replace;
var krpl = regExp_1.keysRegExp.replace;
var kmtch = regExp_1.keysRegExp.match;
function setKey(str) {
    var keyObj = {
        key: null
    };
    var keyStr = str.match(regExp_1.operatorsRegExp.regex.operators);
    var key = vrpl.trimQuoteAndReplaceSlash(str.substring(0, keyStr ? keyStr.index : str.length).trim());
    if (key.startsWith("has ")) {
        keyObj.checkExists = true;
    }
    else if (key.startsWith("!has ")) {
        keyObj.checkExists = false;
    }
    keyObj.key = krpl.removeHas(key).trim();
    return keyObj;
}
exports.setKey = setKey;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var regExp_1 = __webpack_require__(6);
var tst = regExp_1.operatorsRegExp.test;
var mtch = regExp_1.operatorsRegExp.match;
var rpl = regExp_1.operatorsRegExp.replace;
function setOperator(str) {
    var operator = tst.hasOperator(str) ? mtch.getOperator(str)[0].trim() : null;
    var operatorObj = {
        falsy: false,
        operator: null
    };
    if (operator) {
        if (operator.startsWith("not ")) {
            operatorObj.falsy = true;
        }
        operatorObj.operator = "$" + stripOperator(operator);
    }
    return operatorObj;
}
exports.setOperator = setOperator;
function stripOperator(str) {
    var pairs = {
        "is": "type",
        "contains": "elemMatch",
        "join": "lookup"
    };
    return rpl.removeNot(pairs[str] || str);
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(13));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(14);
var regExp_1 = __webpack_require__(6);
function ssParser(str, isAggregateQuery) {
    var returnObj = isAggregateQuery ? {} : [];
    var orig = regExp_1.valuesRegExp.replace.trimQuote(str);
    var spl = orig.split(",");
    var single = false;
    spl.map(function (item) {
        var splItem = item.trim().split(/\s+/);
        var key = regExp_1.valuesRegExp.replace.trimQuoteAndReplaceSlash(splItem[0]);
        if (splItem.length > 1) {
            if (isAggregateQuery) {
                returnObj[key] = utils_1.upDown(splItem[1]);
            }
            else {
                returnObj.push([key, utils_1.upDown(splItem[1])]);
            }
        }
        else {
            if (isAggregateQuery) {
                returnObj[key] = 1;
            }
            else {
                returnObj.push(key); // [key]
                single = splItem[0].length === 1;
            }
        }
    });
    if (single)
        return returnObj[0];
    else
        return returnObj;
}
exports.ssParser = ssParser;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(18));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function typeIs(obj, type) {
    switch (type.toLowerCase()) {
        case "string":
            return typeof obj === "string" || obj instanceof String;
        case "array":
            return Array.isArray(obj) || obj instanceof Array;
        case "object":
            return Object.prototype.toString.call(obj) === "[object Object]";
        case "null":
            return typeof obj === "object" && obj === null;
        case "undefined":
            return obj === void 0;
        case "function":
            return typeof obj === "function";
        case "boolean":
            return typeof obj === "boolean";
        case "number":
            return typeof obj === "number";
        case "symbol":
            return typeof obj === "symbol";
        case "date":
            return typeof obj === "object" && obj instanceof Date;
        default:
            return false;
    }
}
exports.typeIs = typeIs;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function checkNumber(arg) { return isNaN(Number(arg)) ? null : +arg; }
exports.checkNumber = checkNumber;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function upDown(v) {
    var direction;
    switch (v) {
        case "asc":
        case "1":
        case 1:
            direction = 1;
            break;
        case "desc":
        case "-1":
        case -1:
            direction = -1;
            break;
        default:
            direction = 1;
    }
    return direction;
}
exports.upDown = upDown;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sympatico(v) {
    var strippedV = v.replace(/^\$/, "").toLowerCase();
    var replObj = {
        "true": true,
        "false": false,
        "select": "projection",
        "project": "projection",
        "orderby": "sort",
        "top": "limit",
    };
    return replObj[strippedV] || strippedV;
}
exports.sympatico = sympatico;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getProjection_1 = __webpack_require__(20);
exports.getProjection = getProjection_1.getProjection;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getValueObject_1 = __webpack_require__(4);
function getProjection(str) {
    var returnObj = {};
    var includes = 1;
    var modifierExp = /^\s*(include|exclude|incl|excl)\s+/i;
    if (modifierExp.test(str)) {
        if (/^\s*(exclude|excl)\s+/i.test(str)) {
            includes = 0;
        }
        str = str.replace(modifierExp, "");
    }
    var splObj = str.split(",");
    splObj.forEach(function (item, i, arr) {
        var contains = / contains /i;
        if (contains.test(item)) {
            var elemMatch = getValueObject_1.getValueObject(item);
            for (var key in elemMatch) {
                returnObj[key] = elemMatch[key];
            }
        }
        else {
            var projection = item.split(/\s/);
            var p = projection.filter(function (item) {
                return item.trim() !== "";
            }).map(function (item) {
                return item;
            });
            if (p.length > 1) {
                returnObj[p[0].trim()] = p[1].trim();
            }
            else if (includes === 1 && arr.length > 1 && p[0].trim() === "_id") {
                returnObj[p[0].trim()] = 0;
            }
            else {
                returnObj[p[0].trim()] = includes;
            }
        }
    });
    return returnObj;
}
exports.getProjection = getProjection;
;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parseAggregateQuery_1 = __webpack_require__(22);
function ParseAggregate(str, callback) {
    // match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last,name'
    var parser = parseAggregateQuery_1.aqParser();
    var agg = str.split(/ THEN /);
    var returnObj = new Array(agg.length);
    agg.forEach(function (item, idx) {
        returnObj[idx] = parser(item);
    });
    return callback ? callback(returnObj) : returnObj;
}
exports.ParseAggregate = ParseAggregate;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(23));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parseFilterString_1 = __webpack_require__(2);
var parseSortString_1 = __webpack_require__(12);
var parseProjectionString_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(14);
var regExp_1 = __webpack_require__(6);
var unwindParser_1 = __webpack_require__(24);
var lookupParser_1 = __webpack_require__(25);
function aqParser() {
    var memo = {};
    var command = {
        match: parseFilterString_1.qsParser(),
        sort: parseSortString_1.ssParser,
        project: parseProjectionString_1.getProjection,
        limit: utils_1.checkNumber,
        skip: utils_1.checkNumber,
        unwind: unwindParser_1.unwindParser,
        lookup: lookupParser_1.lookupParser
    };
    function parser(str) {
        var value;
        if (str in memo) {
            return memo[str];
        }
        else {
            var body = regExp_1.valuesRegExp.match.extractValue(str)[0].trim();
            var key = regExp_1.keysRegExp.match.getkey(str)[0].trim();
            if (command[key]) {
                value = {};
                var action = command[key];
                value["$" + key] = action(regExp_1.valuesRegExp.replace.trimQuote(body), true);
            }
        }
        memo[str] = value;
        return value;
    }
    return parser;
}
exports.aqParser = aqParser;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var regExp_1 = __webpack_require__(6);
function unwindParser(str) {
    var splStr = str.split(",");
    var map = {
        path: function (val) { return /^\$/.test(val) ? val : "$" + val; },
        includeArrayIndex: function (val) { return /^\$+/.test(val) ? val.replace(/^\$+/, "") : val; },
        preserveNullAndEmptyArrays: function (val) { return val === 'true' ? true : false; },
    };
    var returnObj = {};
    splStr.map(function (item) {
        var key = regExp_1.keysRegExp.match.getkey(item)[0].trim();
        var value = regExp_1.valuesRegExp.match.extractValue(item)[0].trim();
        if (map.hasOwnProperty(key)) {
            returnObj[key] = map[key](value);
        }
    });
    return returnObj;
}
exports.unwindParser = unwindParser;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var regExp_1 = __webpack_require__(6);
function lookupParser(str) {
    var keywords = ["FROM", "WHERE", "AS"], trm = regExp_1.valuesRegExp.replace.trimQuote(str), errorstr = "";
    var lookup = {};
    var options = {
        from: '',
        localField: '',
        foreignField: '',
        as: ''
    };
    var mapped = keywords.map(function (keyword) {
        return [
            trm.indexOf(keyword),
            keyword.length,
            keyword
        ];
    });
    mapped.sort(function (a, b) {
        return b[0] - a[0];
    });
    for (var i = 0; i < mapped.length; i++) {
        if (mapped[i][0] === -1) {
            errorstr += " Missing " + mapped[i][2] + " in lookup string;";
        }
        else {
            var idx = mapped[i][0];
            var lgth = mapped[i][1];
            var key = mapped[i][2];
            var param = trm.slice(idx + lgth);
            var opts = void 0;
            trm = trm.slice(0, mapped[i][0]);
            switch (key) {
                case "WHERE":
                    opts = param.split(/(=| eq )/);
                    options.localField = opts[0].trim();
                    options.foreignField = opts[2].trim();
                    break;
                case "FROM":
                    options.from = param.trim();
                    break;
                case "AS":
                    options.as = param.trim();
                    break;
            }
        }
    }
    if (errorstr) {
        errorstr;
        return errorstr;
    }
    else {
        return options;
    }
}
exports.lookupParser = lookupParser;
;


/***/ })
/******/ ]);
//# sourceMappingURL=mongoqp.js.map