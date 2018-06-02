import { setValue } from "../parseFilterString/setValue";

describe("#setValue", () => {
    describe("eq operator", () => {
        let operator = "$eq";
        it("should be a number", () => {
            const str = "key eq 123";
            let value = setValue(str, operator);
            expect(value).toEqual(123);
        });
        it("should be a string", () => {
            const str = "key eq '123'";
            let value = setValue(str, operator);
            expect(value).toEqual("123");
            
        });
        it("should be a boolean true", () => {
            const str = "key eq true";
            let value = setValue(str, operator);
            expect(value).toEqual(true);

            
        });
        it("should be a boolean false", () => {
            const str = "key eq false";
            let value = setValue(str, operator);
            expect(value).toEqual(false);

            
        });
        it("should be a comma separated string", () => {
            const str = "key eq abc,def";
            let value = setValue(str, operator);
            expect(value).toEqual("abc,def");

            
        });
        it("should be a comma separated string", () => {
            const str = "key eq 'abc, def'";
            let value = setValue(str, operator);
            expect(value).toEqual("abc, def");
            
        });
        it("should return a only partial value -last name", () => {
            const str = "key eq Noah Wallace";
            let value = setValue(str, operator);
            expect(value).toEqual("Wallace");
            
        });
        it("should return special characters", () => {
            const str = "key eq !@#$%^&*()'\"}{~`|\\/?<>,.+_=-[]";
            let value = setValue(str, operator);
            expect(value).toEqual("!@#$%^&*()'\"}{~`|\\/?<>,.+_=-[]");
            
        });
        it("should return apostrophes in string", () => {
            const str = "key eq 'it\'s you\'re we\'ve'";
            let value = setValue(str, operator);
            expect(value).toEqual("it\'s you\'re we\'ve");
            
        });
        it("should return apostrophes in string", () => {
            const str = "key eq 'Date(2015-01-01)'";
            let value = setValue(str, operator);
            expect(value).toEqual(new Date("2015-01-01"));
            
        });
    });
    describe("in operator", () => {
        let operator = "$in";
        it("should be an array", () => {
            const str = "key in 123,'abc'";
            let value = setValue(str, operator) as [any];
            expect(value).toEqual([123,'abc']);

        });
    });
    describe("nin operator", () => {
        let operator = "$nin";
        it("should be an array", () => {
            const str = "key nin 123,'abc'";
            let value = setValue(str, operator);
            expect(value).toEqual([123,'abc']);
            
        });
        it("should return a partial array", () => {
            const str = "key nin 123,abc";
            let value = setValue(str, operator);
            expect(value).toEqual([123]);
            
        });
    });
    describe("gt operator", () => {
        let operator = "$gt";
        it("should be a number that equals 123", () => {
            const str = "key gt 123";
            let value = setValue(str, operator);
            expect(value).toEqual(123);
            
        });
        it("should be a tilde -empty string", () => {
            const str = "key gt ' '";
            let value = setValue(str, operator);
            expect(value).toEqual("~");
            
        });
    });
    describe("gte operator", () => {
        let operator = "$gte";
        it("should be a number that equals 123", () => {
            const str = "key gt 123";
            let value = setValue(str, operator);
            expect(value).toEqual(123);
            
        });
        it("should be a tilde from '' string", () => {
            const str = "key gte ' '";
            let value = setValue(str, operator);
            expect(value).toEqual("~");
            
        });
        it("should be a tilde '' string", () => {
            const str = "key gte ''";
            let value = setValue(str, operator);
            expect(value).toEqual("~");
            
        });
    });
    describe("mod operator", () => {
        let operator = "$mod";
        it("should be an array", () => {
            const str = "key mod 4,0";
            let value = setValue(str, operator);
            expect(value).toEqual([4,0]);
            
        });
    });
    describe("regex operator", () => {
        let operator = "$regex";
        it("should be an array", () => {
            const str = "key regex '/test/i'";
            let value = setValue(str, operator);
            expect(value).toEqual(new RegExp(/test/i));
            
        });
    });
    describe("contains operator", () => {
        let operator = "$elemMatch";
        it("should be an array", () => {
            const str = "grades contains 'grade eq 'B' {AND} score eq 23'";
            let value = setValue(str, operator);
            expect(value).toEqual({"$and":[{"grade":{"$eq":"B"}},{"score":{"$eq":23}}]})
            
        });
    });


});