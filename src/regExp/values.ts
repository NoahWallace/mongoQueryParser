export const valuesRegExp = {
    match  : {
        arrayFromComma: (str: string) => str.match(/((\d+)(?=\s*,*\s*)|(('.+?')(?=\s*,\s*)|('.+'$)))/ig),
        extractValue  : (str) => str.match(/(('.+')+(,'.+')*|\s{1}\S+$)/i),
    },
    replace: {
        trimCurlyBraces         : (str: string) => str.replace(/(^\{|\}$)/g, ""),
        trimQuote               : (str: string) => str.replace(/(^'|'$)/g, ""),
        getRegExString          : (str: string) => str.replace(/(^\/|\/([gim]*)?$)/g, ""),
        getRegExOptions         : (str: string) => str.replace(/(^\/.+\/)(?=[gim]?)/, ""),
        trimQuoteAndReplaceSlash: (str: string) => valuesRegExp.replace.trimQuote(str.replace(/\//g, ".")),
        trimCurlysFromLogicalOps: (str: string) =>
            str.replace(/\{(AND|OR|NOR){1}\}/g,
                (match) => {
                    return valuesRegExp.replace.trimCurlyBraces(match);
                }),
        getDateString           : (str: string) => str.replace(/^Date\(([0-9:a-zA-Z\-]*)\)$/, "$1"),

    },
    test   : {
        isRegExString     : (str: string) => /(^\/|\/([gim]*)?$)/g.test(str),
        isDateParserString: (str: string) => /^Date\(([0-9:a-zA-Z\-]*)\)$/.test(str),
    },

};