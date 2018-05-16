import { qsParser } from "../parseFilterString/queryStringParser";

describe("#parseString", () => {
    let parseString = qsParser();
    describe("Parse Operators Should work with single query", () => {
        it("should return object eq ", (done) => {
            const str = "name eq abc1";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.be.a("object")
            newFilter[ "name" ].should.haveOwnProperty("$eq");
            done();
        });
        it("should return object eq when using apos", (done) => {
            const str = "name eq 'John Doe'";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.be.a("object")
            newFilter[ "name" ].should.haveOwnProperty("$eq");
            newFilter[ "name" ][ "$eq" ].should.equal("John Doe");
            done();
        });
        it("should return object eq boolean when using true", (done) => {
            const str = "name eq true";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.be.a("object")
            newFilter[ "name" ].should.haveOwnProperty("$eq");
            newFilter[ "name" ][ "$eq" ].should.be.true;
            done();
        });
        it("should return object eq string when using 'true'", (done) => {
            const str = "name eq 'true'";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.be.a("object")
            newFilter[ "name" ].should.haveOwnProperty("$eq");
            newFilter[ "name" ][ "$eq" ].should.be.a("string");
            done();
        });
        it("should return falsy object eq when using apos", (done) => {
            const str = "name not eq 'John Doe'";
            let newFilter = parseString(str);


            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.be.a("object")
            newFilter[ "name" ].should.haveOwnProperty("$not");
            newFilter[ "name" ][ "$not" ].should.haveOwnProperty("$eq");
            done();
        });
        it("should return object gt ", (done) => {
            const str = "name gt 123";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$gt");
            newFilter[ "name" ][ "$gt" ].should.equal(123);
            newFilter[ "name" ][ "$gt" ].should.be.a("number");
            done();
        });
        it("should return object gte ", (done) => {
            const str = "name gte 123";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$gte");
            newFilter[ "name" ][ "$gte" ].should.equal(123);
            newFilter[ "name" ][ "$gte" ].should.be.a("number");
            done();
        });
        it("should return object lt ", (done) => {
            const str = "name lt 123";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$lt");
            newFilter[ "name" ][ "$lt" ].should.equal(123);
            newFilter[ "name" ][ "$lt" ].should.be.a("number");
            done();
        });
        it("should return object lte ", (done) => {
            const str = "name lte 123";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$lte");
            newFilter[ "name" ][ "$lte" ].should.equal(123);
            newFilter[ "name" ][ "$lte" ].should.be.a("number");
            done();
        });
        it("should return object ne ", (done) => {
            const str = "name ne 123";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$ne");
            newFilter[ "name" ][ "$ne" ].should.equal(123);
            newFilter[ "name" ][ "$ne" ].should.be.a("number");
            done();
        });
        it("should return object in", (done) => {
            const str = "name in 'abc1','def','ceh'";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$in");
            newFilter[ "name" ][ "$in" ].should.be.a("Array");
            done();
        });
        it("should return object in with number", (done) => {
            const str = "name in 'abc1,a term','abc, def',123";
            let newFilter = parseString(str);
            let inObj = newFilter[ "name" ][ "$in" ];
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$in");
            newFilter[ "name" ][ "$in" ].should.be.a("Array");
            inObj[ inObj.length - 1 ].should.be.a("number");
            done();
        });
        it("should return object nin", (done) => {
            const str = "name nin 'abc1','def','ceh'";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$nin");
            newFilter[ "name" ][ "$nin" ].should.be.a("Array");
            done();
        });
        it("should return object nor", (done) => {
            const str = "name eq abc1 NOR sale eq 123";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("$nor");
            newFilter[ "$nor" ].should.be.a("Array");
            done();
        });
        it("should return object with type using is", (done) => {
            const str = "name is 'array'";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$type");
            done();
        });
        it("should return object with type using type", (done) => {
            const str = "name type 'array'";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$type");
            done();
        });


    });
    describe("testing of exists object", () => {
        it("should return object that contains exists", (done) => {
            const str = "has name";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$exists");
            newFilter[ "name" ][ "$exists" ].should.be.true;
            done();
        });
        it("should return object that contains false exists", (done) => {
            const str = "!has name";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("name");
            newFilter[ "name" ].should.haveOwnProperty("$exists");
            newFilter[ "name" ][ "$exists" ].should.be.false;
            done();
        });
        it("should return and $and object that contains exists", (done) => {
            const str = "!has name AND has assocId ";
            let newFilter = parseString(str);
            let andObj = newFilter[ "$and" ];
            andObj.should.have.length(2);
            andObj[ 0 ].should.haveOwnProperty("name");
            andObj[ 0 ][ "name" ].should.haveOwnProperty("$exists");
            andObj[ 0 ][ "name" ][ "$exists" ].should.be.false;
            andObj[ 1 ].should.haveOwnProperty("assocId");
            andObj[ 1 ][ "assocId" ].should.haveOwnProperty("$exists");
            andObj[ 1 ][ "assocId" ][ "$exists" ].should.be.true;
            done();
        });
        it("should return and $and object that contains exists and nin", (done) => {
            const str = "!has name AND has assocId nin '225101','abcdef' ";
            let newFilter = parseString(str);
            let andObj = newFilter[ "$and" ];
            andObj.should.have.length(2);
            andObj[ 0 ].should.haveOwnProperty("name");
            andObj[ 0 ][ "name" ].should.haveOwnProperty("$exists");
            andObj[ 0 ][ "name" ][ "$exists" ].should.be.false;
            andObj[ 1 ].should.haveOwnProperty("assocId");
            andObj[ 1 ][ "assocId" ].should.haveOwnProperty("$exists");
            andObj[ 1 ][ "assocId" ][ "$exists" ].should.be.true;
            andObj[ 1 ][ "assocId" ].should.haveOwnProperty("$nin");
            andObj[ 1 ][ "assocId" ][ "$nin" ].should.be.a("array").that.contains("225101");
            done();
        });
        it("should should be valid with has keyword and modifier", (done) => {
            const str = "has has AND has eq hasvalue";
            let newFilter = parseString(str);
            let andObj = newFilter[ "$and" ];
            andObj.should.have.length(2);
            andObj[ 0 ].should.haveOwnProperty("has");
            andObj[ 0 ][ "has" ].should.haveOwnProperty("$exists");
            andObj[ 0 ][ "has" ][ "$exists" ].should.be.true;
            andObj[ 1 ].should.haveOwnProperty("has");
            andObj[ 1 ][ "has" ].should.haveOwnProperty("$eq");
            andObj[ 1 ][ "has" ][ "$eq" ].should.equal("hasvalue");
            done();
        });
    })
    describe("Parse Operators Should work with complex Queries", () => {
        it("should return a valid OR object ", (done) => {
            const str = "name eq abc1 OR name eq def";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("$or");
            newFilter[ "$or" ].should.be.a("Array");
            done();
        });
        it("should return a valid AND object ", (done) => {
            const str = "name eq abc1 AND name eq def";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("$and");
            newFilter[ "$and" ].should.be.a("Array");
            done();
        });
        it("should return a valid AND and OR object ", (done) => {
            const str = "name eq abc1 AND name eq def1 OR name eq abc2 AND name eq def2 ";
            let newFilter = parseString(str);
            newFilter.should.be.a("Object");
            newFilter.should.haveOwnProperty("$or");
            newFilter[ "$or" ].should.be.a("Array").with.length(2);
            done();
        });
        // "
        it("should return a valid AND and OR object with Complexities ", (done) => {
            const str = "name eq abc1 OR name eq def1 AND name eq abc2 AND name in 'def2','get','ple'";
            let newFilter = parseString(str);
			newFilter.should.deep.equal({"$or":[{"name":{"$eq":"abc1"}},{"$and":[{"name":{"$eq":"def1"}},{"name":{"$eq":"abc2"}},{"name":{"$in":["def2","get","ple"]}}]}]})
            done();
        });
        // TODO: Finish tests for contains Operators
        it("should return a valid AND and OR object with Complexities ", (done) => {
            const str = "grades contains 'grade eq 'B' {AND} score eq 23'";
            let newFilter = parseString(str);
            newFilter.should.deep.equal({"grades":{"$elemMatch":{"$and":[{"grade":{"$eq":"B"}},{"score":{"$eq":23}}]}}})

            done();
        });
    });
});