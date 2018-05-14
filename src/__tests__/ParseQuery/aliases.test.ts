import { ParseQuery } from "../../index";


describe("All Query Parameters have working aliases",()=>{
    const params1 = {
        $top:1,
        $filter:"name eq 'abc'",
        $select:"_id,name",
        $skip:1,
        $orderby:"name asc",
    };
    const params2 = {
        $limit:1,
        $filter:"name eq 'abc'",
        $project:"_id,name",
        $skip:1,
        $sort:"name asc",
    };
    let obj1=ParseQuery(params1);
    let obj2=ParseQuery(params2);
    it("should return property limit",(done)=>{
        obj1.should.haveOwnProperty("limit");
        obj2.should.haveOwnProperty("limit");
        done();
    });
    it("should return property filter",(done)=>{
        obj1.should.haveOwnProperty("filter");
        obj2.should.haveOwnProperty("filter");
        done();
    });
    it("should return property project",(done)=>{
        obj1.should.haveOwnProperty("projection");
        obj2.should.haveOwnProperty("projection");
        done();
    });
    it("should return property skip",(done)=>{
        obj1.should.haveOwnProperty("skip");
        obj2.should.haveOwnProperty("skip");
        done();
    });
    it("should return property sort",(done)=>{
        obj1.should.haveOwnProperty("sort");
        obj2.should.haveOwnProperty("sort");
        done();
    });
    it("should return keys or values",(done)=>{
        obj1.limit.should.be.a("number");
        obj2.limit.should.be.a("number");
        obj1.skip.should.be.a("number");
        obj2.skip.should.be.a("number");
        obj1.projection.should.be.an("object").with.property("_id");
        obj2.projection.should.be.an("object").with.property("_id");
        obj1.filter.should.be.an("object").with.property("name");
        obj2.filter.should.be.an("object").with.property("name");
        obj1.sort.should.be.an("array");
        obj2.sort.should.be.an("array");



        done();
    })
})