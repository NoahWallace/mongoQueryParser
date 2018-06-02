import {ParseQuery} from "../../index";

describe('#ParseQuery', () => {
    describe("AND operators create root array", () => {

        it("should have $and at the root", () => {
            const query = {filter: "name eq 'abc' AND title eq 'CEO'"};
            const parser = ParseQuery(query);
            expect(parser).toHaveProperty("filter",{"$and": [ {name: {"$eq": "abc"}}, {"title": {"$eq": "CEO"}}]})
            
        })
        it("should have $or at the root", () => {
            const query = {filter: "name eq 'abc' OR title eq 'CEO'"};
            const parser = ParseQuery(query);
            console.log(parser)
            expect(parser).toHaveProperty("filter",{ $or: [ { name: { $eq:"abc" }}, { title:{ $eq:"CEO" } } ]});
            
        })
        it("should have $or at the root with $and as sub object", () => {
            const query = {filter: "name eq 'abc' AND title eq 'CEO' OR name eq 'def'"};
            const parser = ParseQuery(query);
            expect(parser).toEqual({filter: {"$or": [{"$and": [{name: {"$eq": "abc"}}, {title: {$eq: "CEO"}}]}, {name: {"$eq": "def"}}]}});
            
        });
    })

})