import {ParseQuery} from "../../index";

describe.only('#ParseQuery', () => {
    describe("AND operators create root array", () => {

        it("should have $and at the root", (done) => {
            const query = {filter: "name eq 'abc' AND title eq 'CEO'"};
            const parser = ParseQuery(query);
            parser.should.have.property("filter").that.has.property("$and").that.is.an("Array");
            done();
        })
        it("should have $or at the root", (done) => {
            const query = {filter: "name eq 'abc' OR title eq 'CEO'"};
            const parser = ParseQuery(query);
            parser.should.have.property("filter").that.has.property("$or").that.is.an("Array");
            done();
        })
        it("should have $or at the root with $and as sub object", (done) => {
            const query = {filter: "name eq 'abc' AND title eq 'CEO' OR name eq 'def'"};
            const parser = ParseQuery(query);
            parser.should.deep.equal({filter: {"$or": [{"$and": [{name: {"eq": "abc"}}, {title: {$eq: "CEO"}}]}, {name: {"$eq": "def"}}]}});
            done();
        });
    })

})