
import {ParseQuery} from "../../index";

describe("Evaluate all filter operators", () => {
    // Comparison
    it("should evaluate the eq operator", () => {
        const str = "name eq 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$eq": "abc" } } });

    });
    it("should evaluate the gt operator", () => {
        const str = "name gt 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$gt": "abc" } } });
        
    });
    it("should evaluate the gte operator", () => {
        const str = "name gte 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$gte": "abc" } } });
        
    });
    it("should evaluate the in operator", () => {
        const str = "name in 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$in": [ "abc" ] } } });
        
    });
    it("should evaluate the nin operator", () => {
        const str = "name nin 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$nin": [ "abc" ] } } });
        
    });
    it("should evaluate the lt operator", () => {
        const str = "name lt 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$lt": "abc" } } });
        
    });
    it("should evaluate the lte operator", () => {
        const str = "name lte 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$lte": "abc" } } });
        
    });
    it("should evaluate the ne operator", () => {
        const str = "name ne 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$ne": "abc" } } });
        
    });

    // Logical
    it("should contain $and on top level", () => {
        const str = "name ne 'abc' AND name ne 'def'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "$and": [ { "name": { "$ne": "abc" } }, { "name": { "$ne": "def" } } ] } });
        
    });
    it("should contain $or on top level", () => {
        const str = "name eq 'abc' OR name eq 'def'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "$or": [ { "name": { "$eq": "abc" } }, { "name": { "$eq": "def" } } ] } });
        
    });
    it("should contain $nor on top level", () => {
        const str = "name eq 'abc' NOR name eq 'def'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "$nor": [ { "name": { "$eq": "abc" } }, { "name": { "$eq": "def" } } ] } });
        
    });
    it("should contain $not on top level", () => {
        const str = "name not eq 'abc'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$not": { "$eq": "abc" } } } });
        
    });

    //Element
    it("should contain $exists on top level", () => {
        const str = "has name";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$exists": true } } });
        
    });
    it("should contain $exists on top level", () => {
        const str = "!has name";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$exists": false } } });
        
    });
    it("should contain $type on top level", () => {
        const str = "name type 'Array'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$type": "Array" } } });
        
    });
    it("should contain $type on top level using is", () => {
        const str = "name is 'Array'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$type": "Array" } } });
        
    });

    // Evaluation
    /*
     * TODO: $expr,$jsonSchema,$text,$where(operator)
     */
    it("should contain $mod on identifier level", () => {
        const str = "qty mod 4,0";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "qty": { "$mod": [ 4, 0 ] } } });
        
    });
    it("should contain $regex on identifier level", () => {
        const str = "key regex '/something/i'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "key": { "$regex": /something/i } } });
        
    });

    // Geospacial
    /*
     * TODO: $geoIntersects,$geoWithin,$near,$nearSphere
     */

    // Array
    it("should contain $all on top level", () => {
        const str = "name all 'Joe','Burt','Ernie'";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$all": [ "Joe", "Burt", "Ernie" ] } } });
        
    });
    it("should contain $elemmatch on top level", () => {
        const str = "name contains 'name eq 'Joe''";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$elemMatch": { "name": { "$eq": "Joe" } } } } });
        
    });
    it("should contain $size on top level", () => {
        const str = "name size 0";
        let p     = ParseQuery(str);
        expect(p).toEqual({ filter: { "name": { "$size": 0 } } });
        
    });

    //BITWISE
    /*
     * TODO : $bitsAllClear,$bitsAllSet,$bitsAnyClear,$bitsAnySet
     */

    // Comments
    /*
     * TODO: $comment
     */

});