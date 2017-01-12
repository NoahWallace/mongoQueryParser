import * as chai from "chai";
const should = chai.should();
import { setValue } from "../parseFilterString/setValue";

describe("#setValue", () => {
    describe("eq operator", () => {
        let operator = "$eq";
        it("should be a number", (done) => {
            const str = "key eq 123";
            let value = setValue(str, operator);
            value.should.be.a("number");
            value.should.equal(123);
            done();
        });
        it("should be a string", (done) => {
            const str = "key eq '123'";
            let value = setValue(str, operator);
            value.should.be.a("string");
            done();
        });
        it("should be a boolean true", (done) => {
            const str = "key eq true";
            let value = setValue(str, operator);
            value.should.be.a("boolean");
            value.should.be.true;
            done();
        });
        it("should be a boolean false", (done) => {
            const str = "key eq false";
            let value = setValue(str, operator);
            value.should.be.a("boolean");
            value.should.be.false;
            done();
        });
        it("should be a comma separated string", (done) => {
            const str = "key eq abc,def";
            let value = setValue(str, operator);
            value.should.be.a("string");
            value.should.equal("abc,def");
            done();
        });
        it("should be a comma separated string", (done) => {
            const str = "key eq 'abc, def'";
            let value = setValue(str, operator);
            value.should.be.a("string");
            value.should.equal("abc, def");
            done();
        });
        it("should return a only partial value -last name", (done) => {
            const str = "key eq Noah Wallace";
            let value = setValue(str, operator);
            value.should.be.a("string");
            value.should.equal("Wallace");
            done();
        });
        it("should return special characters", (done) => {
            const str = "key eq !@#$%^&*()'\"}{~`|\\/?<>,.+_=-[]";
            let value = setValue(str, operator);
            value.should.be.a("string");
            value.should.equal("!@#$%^&*()'\"}{~`|\\/?<>,.+_=-[]");
            done();
        });
        it("should return apostrophes in string", (done) => {
            const str = "key eq 'it\'s you\'re we\'ve'";
            let value = setValue(str, operator);
            value.should.be.a("string");
            value.should.equal("it\'s you\'re we\'ve");
            done();
        });
    });
    describe("in operator", () => {
        let operator = "$in";
        it("should be an array", (done) => {
            const str = "key in 123,'abc'";
            let value = setValue(str, operator);
            value.should.be.a("array");
            value.should.have.length(2);
            value[0].should.be.a("number");
            value[1].should.be.a("string");
            done();
        });
    });
    describe("nin operator", () => {
        let operator = "$nin";
        it("should be an array", (done) => {
            const str = "key nin 123,'abc'";
            let value = setValue(str, operator);
            value.should.be.a("array");
            value.should.have.length(2)
            value[0].should.be.a("number");
            value[1].should.be.a("string");
            done();
        });
        it("should return a partial array", (done) => {
            const str = "key nin 123,abc";
            let value = setValue(str, operator);
            value.should.be.a("array");
            value.should.have.length(1)
            value[0].should.be.a("number");
            done();
        });
    });
    describe("gt operator", () => {
        let operator = "$gt";
        it("should be a number that equals 123", (done) => {
            const str = "key gt 123";
            let value = setValue(str, operator);
            value.should.be.a("number").that.equals(123);
            done();
        });
        it("should be a tilde -empty string", (done) => {
            const str = "key gt ' '";
            let value = setValue(str, operator);
            value.should.be.a("string").that.equals("~");
            done();
        });
    });
    describe("gte operator", () => {
        let operator = "$gte";
        it("should be a number that equals 123", (done) => {
            const str = "key gt 123";
            let value = setValue(str, operator);
            value.should.be.a("number").that.equals(123);
            done();
        });
        it("should be a tilde from '' string", (done) => {
            const str = "key gte ' '";
            let value = setValue(str, operator);
            value.should.be.a("string").that.equals("~");
            done();
        });
        it("should be a tilde '' string", (done) => {
            const str = "key gte ''";
            let value = setValue(str, operator);
            value.should.be.a("string").that.equals("~");
            done();
        });
    });
    describe("mod operator", () => {
        let operator = "$mod";
        it("should be an array", (done) => {
            const str = "key mod 4,0";
            let value = setValue(str, operator);
            value.should.be.a("array");
            value.should.have.length(2);
            value[0].should.equal(4);
            value[1].should.equal(0);
            done();
        });
    });
    describe("regex operator", () => {
        let operator = "$regex";
        it("should be an array", (done) => {
            const str = "key regex '/test/i'";
            let value = setValue(str, operator);
            value.should.be.instanceof(RegExp);
            done();
        });
    });
    describe("contains operator", () => {
        let operator = "$elemMatch";
        it("should be an array", (done) => {
            const str = "grades contains 'grade eq 'B' {AND} score eq 23'";
            let value = setValue(str, operator);
            done();
        });
    });


});