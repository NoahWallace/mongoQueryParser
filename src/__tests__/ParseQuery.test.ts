import * as chai from "chai";
const should = chai.should();
import { ParseQuery } from "../index";

describe('#ParseQuery',()=>{
    describe("Pass a string to Function",()=>{
        let str = "name eq 'abc'";
        let obj = ParseQuery(str);
        it("should return an object that contains  filter",(done)=>{
            obj.should.be.a("object");
            obj.should.haveOwnProperty("filter");
            done();
        })
        it("should return an object that contains filter",(done)=>{
            obj.filter.should.be.a("object");
            obj.filter.should.haveOwnProperty("name");
            done();
        })
    })
})