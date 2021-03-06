import * as chai from "chai";
const should = chai.should();
import { ParseQuery } from "../index";

describe('#ParseQuery',()=>{
    describe("Contain a date object in the filter",()=> {

        it("return a filter object with a date value", (done) => {
            let query = { $filter: "updated_at lt 'Date(2018-01-01)'" };
            let obj   = ParseQuery(query);
            obj.should.be.a("object");
            obj.should.haveOwnProperty("filter");
            obj.filter.updated_at["$lt"].should.be.a("Date");
            done();
        })
    })
    describe("Aliases should resolve properly",()=>{

        it("should return an object that contains a simple filter",(done)=>{
            let query={$filter:"name eq 'abc'"};
            let obj=ParseQuery(query);
            obj.should.be.a("object");
            obj.should.haveOwnProperty("filter");
            obj.filter.should.haveOwnProperty("name");
            done();
        })
        it("should return an object that contains a simple filter",(done)=>{
            let query={$top:1,$skip:1,$orderby:"name asc",$select:"_id,name"};
            let obj=ParseQuery(query);

            obj.should.be.a("object");
            obj.should.haveOwnProperty("limit");
            obj.should.haveOwnProperty("skip");
            obj.should.haveOwnProperty("projection");
            obj.should.haveOwnProperty("sort");

            done();
        })
    })
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
    describe("Contains Projection Object",()=>{
        it("should return an object that contains projection",(done)=>{
            let query=ParseQuery({project:'name $Name'});
            query.should.be.a("object");
            query.projection.should.haveOwnProperty("name");
            query.projection["name"].should.equal("$Name")
            done();
        })
        it("should return an object that contains projection with spaces",(done)=>{
            let query=ParseQuery({project:'my key,name $Name,employee, your key'});
            query.should.be.a("object");
            query.projection.should.haveOwnProperty("name").that.equals("$Name");
            query.projection.should.haveOwnProperty("my key").that.equals(1);
            query.projection.should.haveOwnProperty("employee").that.equals(1);
            query.projection.should.haveOwnProperty("your key").that.equals(1);
            done();
        })
        it("should return an object that contains projections",(done)=>{
            let query=ParseQuery({filter:"name eq 'abc' AND storeNum eq 243",project:'name $storeNum, _id, storeNum'});
            query.should.be.a("object");
            query.projection.should.haveOwnProperty("name");
            query.projection["name"].should.equal("$storeNum");
            query.projection["_id"].should.equal(0);
            query.projection["storeNum"].should.equal(1);
            query.filter.should.haveOwnProperty("$and")
            query.filter["$and"].should.be.a("Array").that.has.lengthOf(2);
            done();
        });
        it("should have a and object with a or sub object ",(done)=>{
            let query=ParseQuery("name eq 'Wallace' AND (title eq 'CEO' OR jobTitle eq 'CEO')");
            query.should.deep.equal({"filter":{"$and":[{"name":{"$eq":"Wallace"}},{"$or":[{"title":{"$eq":"CEO"}},{"jobTitle":{"$eq":"CEO"}}]}]}})
            done();
        })
        it("should have a and object with a or sub object ",(done)=>{
            let query=ParseQuery("name eq 'abc' AND name eq 'def' OR name eq 'ghi'");
            query.should.deep.equal({"filter":{"$or":[{"$and":[{"name":{"$eq":"abc"}},{"name":{"$eq":"def"}}]},{"name":{"$eq":"ghi"}}]}})
            done();
        })
        it("should have a and object with a or sub object ",(done)=>{
            let query=ParseQuery("(name eq 'abc' AND name eq 'def') OR name eq 'ghi'");
            query.should.deep.equal({"filter":{"$or":[{"$and":[{"name":{"$eq":"abc"}},{"name":{"$eq":"def"}}]},{"name":{"$eq":"ghi"}}]}});
            done();
        })
        it("should have a and object with a or sub object ",(done)=>{
            let query=ParseQuery("name eq 'abc' AND (name eq 'def' OR name eq 'ghi') AND name eq 'lkh'");
            query.should.deep.equal({"filter":{"$and":[{"name":{"$eq":"abc"}},{"$or":[{"name":{"$eq":"def"}},{"name":{"$eq":"ghi"}}]},{"name":{"$eq":"lkh"}}]}})
            done();
        })
    })
})