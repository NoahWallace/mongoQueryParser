/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ParseQuery_1 = __webpack_require__(1);
	exports.ParseQuery = ParseQuery_1.ParseQuery;
	(function () {
	    if (typeof module !== "undefined" && module.exports && typeof window === 'undefined') { }
	    else {
	        window.ParseQuery = ParseQuery_1.ParseQuery;
	    }
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var parseFilterString_1 = __webpack_require__(2);
	var parseSortString_1 = __webpack_require__(12);
	var parseProjectionString_1 = __webpack_require__(14);
	function ParseQuery(reqQuery) {
	    var checkNumber = function (arg) { return isNaN(Number(arg)) ? null : +arg; };
	    var command = {
	        filter: parseFilterString_1.qsParser(),
	        limit: checkNumber,
	        sort: parseSortString_1.ssParser,
	        skip: checkNumber,
	        project: parseProjectionString_1.getProjection
	    };
	    var returnObj = {
	        filter: {}
	    };
	    if (typeof reqQuery === "string") {
	        returnObj["filter"] = command.filter(decodeURIComponent(reqQuery));
	    }
	    else {
	        for (var key in reqQuery) {
	            if (command.hasOwnProperty(key)) {
	                var action = command[key];
	                returnObj[key] = action(decodeURIComponent(reqQuery[key]));
	            }
	        }
	    }
	    return returnObj;
	}
	exports.ParseQuery = ParseQuery;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var getValueObject_1 = __webpack_require__(4);
	function qsParser() {
	    var memo = {};
	    var regExOr = new RegExp(/ OR /g);
	    var regExAnd = new RegExp(/ AND /g);
	    var regExNor = new RegExp(/ NOR /g);
	    function getSplit(obj, regex) {
	        var newArr = [];
	        var spl = obj.split(regex);
	        spl.forEach(function (item) {
	            newArr.push(parser(item.trim()));
	        });
	        return newArr;
	    }
	    function parser(str) {
	        var value;
	        if (str in memo) {
	            value = memo[str];
	        }
	        else {
	            if (str.match(regExOr)) {
	                value = {};
	                value["$or"] = getSplit(str, regExOr);
	            }
	            else if (str.match(regExAnd)) {
	                value = {};
	                value["$and"] = getSplit(str, regExAnd);
	            }
	            else if (str.match(regExNor)) {
	                value = {};
	                value["$nor"] = getSplit(str, regExNor);
	            }
	            else {
	                value = getValueObject_1.getValueObject(str);
	            }
	        }
	        return value;
	    }
	    ;
	    return parser;
	}
	exports.qsParser = qsParser;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	        qArr.forEach(function (item, idx) {
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
	        return isNaN(Number(str)) ? cleanStr : +str;
	    }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.operatorsRegExp = {
	    regex: {
	        operators: new RegExp(/\s+(not)*\s*(eq|gt|gte|lt|lte|ne|in|nin|is|type|mod|regex|all|size|contains)\s+/)
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


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	exports.valuesRegExp = {
	    match: {
	        arrayFromComma: function (str) { return str.match(/((\d+)(?=\s*,*\s*)|(('.+?')(?=\s*,\s*)|('.+'$)))/ig); },
	        extractValue: function (str) { return str.match(/(('.+')+(,'.+')*|\s{1}\S+$)/i); }
	    },
	    replace: {
	        trimCurlyBraces: function (str) { return str.replace(/(^\{|\}$)/g, ""); },
	        trimQuote: function (str) { return str.replace(/(^'|'$)/g, ""); },
	        getRegExString: function (str) { return str.replace(/(^\/|\/([gim]*)?$)/g, ""); },
	        getRegExOptions: function (str) { return str.replace(/(^\/.+\/)(?=[gim]?)/, ""); },
	        trimCurlysFromLogicalOps: function (str) {
	            return str.replace(/\{(AND|OR|NOR){1}\}/g, function (match) { return exports.valuesRegExp.replace.trimCurlyBraces(match); });
	        }
	    },
	    test: {
	        isRegExString: function (str) { return /(^\/|\/([gim]*)?$)/g.test(str); },
	    }
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	exports.keysRegExp = {
	    match: {
	        getkey: function (str) { return str.match(/(^(\s*!?has\s+)?([^\s]+)|(^\s*[^\s]+))/i); }
	    },
	    replace: {
	        removeHas: function (str) { return str.replace(/^(!?has\s+)/, ""); }
	    }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var regExp_1 = __webpack_require__(6);
	var vrpl = regExp_1.valuesRegExp.replace;
	var krpl = regExp_1.keysRegExp.replace;
	var kmtch = regExp_1.keysRegExp.match;
	function setKey(str) {
	    var keyObj = {
	        key: null
	    };
	    var key = vrpl.trimQuote(kmtch.getkey(str)[0].trim());
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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	        "contains": "elemMatch"
	    };
	    return rpl.removeNot(pairs[str] || str);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(13));


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	function ssParser(str) {
	    var returnObj = [];
	    var spl = str.split(",");
	    var single = false;
	    spl.map(function (item) {
	        var splItem = item.trim().split(/\s+/);
	        if (splItem.length > 1) {
	            returnObj.push(splItem); //[key, TSortString]
	        }
	        else {
	            returnObj.push(splItem[0]); // [key]
	            single = splItem[0].length === 1;
	        }
	    });
	    if (single)
	        return returnObj[0];
	    else
	        return returnObj;
	}
	exports.ssParser = ssParser;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var getProjection_1 = __webpack_require__(15);
	exports.getProjection = getProjection_1.getProjection;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var getValueObject_1 = __webpack_require__(4);
	function getProjection(str) {
	    var splObj = str.split(",");
	    var returnObj = {
	        "_id": 0
	    };
	    splObj.forEach(function (item) {
	        var contains = / contains /i;
	        if (contains.test(item)) {
	            var elemMatch = getValueObject_1.getValueObject(item);
	            for (var key in elemMatch) {
	                returnObj[key] = elemMatch[key];
	            }
	        }
	        else {
	            returnObj[item.trim()] = 1;
	        }
	    });
	    return returnObj;
	}
	exports.getProjection = getProjection;
	;


/***/ }
/******/ ]);
//# sourceMappingURL=mongoqp.js.map