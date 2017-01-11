export type TValue = RegExp | string | number | Array<string | number | RegExp>
export function setValue (obj: string, operator: string): TValue {
    /*
     * matches all <values> at end of string that are wrapped in apostrophes OR all digits
     */
    let RValueArray: RegExp = new RegExp(/((\d+)(?=\s*,*\s*)|(('.+?')(?=\s*,\s*)|('.+'$)))/ig);
    /*
     * matches whole string including and after the last space that have apos followed by comma OR have apos
     */
    let RValueString: RegExp = new RegExp(/(('.+')+(,'.+')*|\s{1}\S+$)/i);

    let qArr: RegExpMatchArray = obj.match(RValueArray);
    let value: TValue;
    let OperatorsWithArray=["$in","$nin","$mod","$all"];
    if ( OperatorsWithArray.indexOf(operator) > -1 ) {
        // strings must be wrapped in '' numbers are not
        value = [ qArr.length ] as Array<string | number>;
        qArr.forEach((item, idx) => {
            value[ idx ] = checkType(item);
        });
    }
    else {
        let str: string = obj.match(RValueString)[ 0 ].trim();
        const compare = {
            "true":  true,
            "false": false
        };
        if ( compare[ str ] || str === "false") {
            value = compare[ str ];
        }
        else {
            value=checkType(str)

        }
    }
    // prevent mongoinjection
    if ((operator === "$gt" || operator === "$gte") && typeof value === "string"  ) {
        if(!value || value.match(/^\s+$/))
        return "~";
    }

    return value;
}

function checkType(str): string | number | RegExp{
    let RValueRegex: RegExp = new RegExp(/^\/.+\/([gim]*)?$/);
    let cleanStr = str.replace(/(^'|'$)/g, "");
    if(RValueRegex.test(cleanStr)){
        let regExp=cleanStr.replace(/(^\/|\/([gim]*)?$)/g,"");
        let options =  cleanStr.replace(/(^\/.+\/)(?=[gim]?)/,"");
        return new RegExp(regExp,options) as RegExp;
    }
    else{
        return isNaN(Number(str)) ? cleanStr : +str as string | number;
    }
}