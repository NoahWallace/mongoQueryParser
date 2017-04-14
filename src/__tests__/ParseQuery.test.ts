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
    describe("Pass a string to Function",()=>{
        it("should return an object that contains projections",(done)=>{
            let query=ParseQuery({project:'name $Name'});
            query.should.be.a("object");
            query.project.should.haveOwnProperty("name");
            query.project["name"].should.equal("$Name")
            done();
        })
        it("should return an object that contains projections",(done)=>{
            let query=ParseQuery({filter:"name eq 'abc' AND storeNum eq 243",project:'name $storeNum, _id, storeNum'});
            query.should.be.a("object");
            query.project.should.haveOwnProperty("name");
            query.project["name"].should.equal("$storeNum");
            query.project["_id"].should.equal(0);
            query.project["storeNum"].should.equal(1);console.log(query.filter)
            query.filter.should.haveOwnProperty("$and")
            query.filter["$and"].should.be.a("Array").that.has.lengthOf(2);
            done();
        })
    })
})