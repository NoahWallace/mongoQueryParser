export function setValue (obj: string, operator: string): string | number | Array<string | number> {
    // let RValueArray: RegExp = new RegExp(/(('.+?')(?=\s*,\s*)|('.+'$))/ig);
    /*
     * matches all <values> at end of string that are wrapped in apostrophes OR all digits
     */
    let RValueArray: RegExp = new RegExp(/((\d+)(?=\s*,*\s*)|(('.+?')(?=\s*,\s*)|('.+'$)))/ig);
    /*
     * matches whole string including and after the last space that have apos followed by comma OR have apos
     */
    let RValueString: RegExp = new RegExp(/(('.+')+(,'.+')*|\s{1}\S+$)/i);

    let qArr: RegExpMatchArray = obj.match(RValueArray);
    let value: string | number | Array<string | number>;
    let OperatorsWithArray=["$in","$nin","$mod"];
    if ( OperatorsWithArray.indexOf(operator) > -1 ) {
        // strings must be wrapped in '' numbers are not
        value = [ qArr.length ] as Array<string | number>;
        qArr.forEach((item, idx) => {
            value[ idx ] = isNaN(Number(item)) ? item.replace(/(^'|'$)/g, "") : +item;
        });
    }
    else {
        let str: string = obj.match(RValueString)[ 0 ].trim();
        const compare = {
            "true":  true,
            "false": false
        }
        if ( compare[ str ] || str === "false") {
            value = compare[ str ];
        }
        else {
            let simpleStr = str.replace(/(^'|'$)/g, "");
            value = isNaN(Number(str)) ? simpleStr : +str as string | number;
        }
    }
    // prevent mongoinjection
    if ((operator === "$gt" || operator === "$gte") && typeof value === "string"  ) {
        if(!value || value.match(/^\s+$/))
        return "~";
    }

    return value;
}