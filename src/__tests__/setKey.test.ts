import { setKey } from "../parseFilterString/setKey";

describe("#setKey", () => {
    let normalStr = [
        [ "name", "eq 'Mickey'" ],
        [ "associate.name ", "in 'Mickey','Donald'" ],
        [ "associate.first_name", "eq 'Mickey'" ],
        [ "last-name", "eq 'Mickey'" ],
        [ "last_name", "eq 'Mickey'" ],
        [ "name" ],
        [ "associate.name " ],
        [ "associate.first_name" ],
        [ "last-name" ],
        [ "last_name" ],
        [ "has", "eq 'Mickey'"],

    ];
    let oDataStr = [
        [[ "associate/name ", "in 'Mickey','Donald'" ],"associate.name"],
        [[ "associate/first_name", "eq 'Mickey'" ],"associate.first_name"],
        [[ "last-name", "eq 'Mickey'" ],"last-name"],
        [[ "last_name", "eq 'Mickey'" ],"last_name"],
        [[ "associate/name " ],"associate.name"],
        [[ "associate/first_name" ],"associate.first_name"],
        [[ "'associate/first_name'"],"associate.first_name"]
    ];
    let invalidStr = [
        [ " name'", " eq 'Mickey'" ],
        //[ "associate[ 'first_name']'", " eq 'Mickey'" ],
        //[ "'last-nam e'", " eq 'Mickey'" ],
        [ "'last-name'", "eq 'Mickey'" ]

    ];
    describe("returns valid keys", () => {
        normalStr.map((item) => {
            it(`should return the key ${item[ 0 ]}`, () => {
                let key = setKey(item.join(" "));
				expect(key).toEqual({key:item[0].trim()})
                
            });
        });
    });
    describe("returns valid keys with checkExists flag true", () => {
        normalStr.map((item) => {
            it(`should return the key ${item[ 0 ].trim()} and have checkExists eq true`, () => {
                let key = setKey("has " + item.join(" "));
				expect(key).toEqual({checkExists:true,key:item[0].trim()})
                
            });
        });
    });
    describe("returns valid keys with checkExists flag false", () => {
        normalStr.map((item) => {
            it(`should return the key ${item[ 0 ].trim()} and have checkExists eq false`, () => {
                let key = setKey("!has " + item.join(" "));
				expect(key).toEqual({checkExists:false,key:item[0].trim()})
                
            });
        });
    });
    // TODO:  add functionality to parse bracket notation
    describe("returns invalid keys", () => {
        invalidStr.map((item) => {
            it(`should NOT return the key ${item[ 0 ].trim()}`, () => {
                let key = setKey(item.join(""));
                expect(key.key).not.toEqual(item[ 0 ].trim())
                
            });
        });
    });
    describe("returns valid keys", () => {
        oDataStr.map((item:any[]) => {
            it(`should return the key ${item[1]}`, () => {
                let key = setKey(item[0].join(" "));
				expect(key).toEqual({key:item[1].trim()})
                
            });
        });
    });
});