import { qsParser } from '../parseFilterString';
import { ssParser } from '../parseSortString';
import { getProjection } from '../parseProjectionString';
import { checkNumber } from '../utils';
import { valuesRegExp, keysRegExp } from '../regExp';
import { unwindParser} from "./unwindParser";
export function aqParser () {
    let memo = {};
    let command = {
        match:   qsParser(),
        sort:    ssParser,
        project: getProjection,
        limit:   checkNumber,
        skip:    checkNumber,
        unwind:  unwindParser,

    }

    function parser (str: string) {
        let value;
        if ( str in memo ) {
            return memo[ str ]
        }
        else {
            let body = valuesRegExp.match.extractValue(str)[ 0 ].trim();
            let key = keysRegExp.match.getkey(str)[ 0 ].trim();

            if ( command[ key ] ) {
                value = {};
                let action = command[ key ];
                value[ "$" + key ] = action(valuesRegExp.replace.trimQuote(body));

            }

        }
        memo[str]=value;
        return value
    }

    return parser;
}

