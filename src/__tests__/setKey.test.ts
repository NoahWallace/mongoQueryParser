import * as chai from "chai";
const should = chai.should();
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


    ];
    let invalidStr = [
        [ " name'", " eq 'Mickey'" ],
        [ "associate[ 'first_name']'", " eq 'Mickey'" ],
        [ "'last-nam e'", " eq 'Mickey'" ],
        [ "'last-name'", "eq 'Mickey'" ]
    ];
    describe("returns valid keys", () => {
        normalStr.map((item) => {
            it(`should return the key ${item[ 0 ]}`, (done) => {
                let key = setKey(item.join(" "));
                key.should.be.a("object");
                key.should.not.haveOwnProperty("checkExists");
                key.should.haveOwnProperty("key");
                key[ "key" ].should.equal(item[ 0 ].trim());
                done();
            });
        });
    });
    describe("returns valid keys with checkExists flag true", () => {
        normalStr.map((item) => {
            it(`should return the key ${item[ 0 ].trim()} and have checkExists eq true`, (done) => {
                let key = setKey("has " + item.join(" "));
                key.should.be.a("object");
                key.should.haveOwnProperty("checkExists");
                key.checkExists.should.equal(true);
                key.should.haveOwnProperty("key");
                key[ "key" ].should.equal(item[ 0 ].trim());
                done();
            });
        });
    });
    describe("returns valid keys with checkExists flag false", () => {
        normalStr.map((item) => {
            it(`should return the key ${item[ 0 ].trim()} and have checkExists eq false`, (done) => {
                let key = setKey("!has " + item.join(" "));
                key.should.be.a("object");
                key.should.haveOwnProperty("checkExists");
                key.checkExists.should.equal(false);
                key.should.haveOwnProperty("key");
                key[ "key" ].should.equal(item[ 0 ].trim());
                done();
            });
        });
    });
    describe("returns invalid keys", () => {
        invalidStr.map((item) => {
            it(`should NOT return the key ${item[ 0 ].trim()}`, (done) => {
                let key = setKey(item.join(""));
                key.key.should.not.equal(item[0]);
                done();
            });
        });
    });
});