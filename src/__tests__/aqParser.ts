import * as chai from "chai";
const should = chai.should();
import { ParseAggregate } from "../ParseAggregate";
import { lookupParser } from "../parseAggregateQuery/lookupParser";


describe("#ParseAggregate",()=>{
     it("should be an array and have proper values",(done)=>{
         let str=`match 'name eq 'abc'' 
         THEN project '_id,name,created' 
         THEN sort 'last asc, name' 
         THEN unwind 'path name,preserveNullAndEmptyArrays true'`;
         let aggregationArray = ParseAggregate(str);
        aggregationArray.should.be.a("Array");
        aggregationArray.should.have.length(4);
        aggregationArray[0].should.have.property("$match");
        aggregationArray[1].should.have.property("$project");
        aggregationArray[2].should.have.property("$sort");
        aggregationArray[3].should.have.property("$unwind");

        done();
    })
    it("should have a mutated project statement",(done)=>{
        let str=`match 'name eq 'abc'' 
         THEN project '_id,name,created,Logging $SomeText.0'`;
        let aggregationArray = ParseAggregate(str);
        aggregationArray.should.be.a("Array");
        aggregationArray.should.have.length(2);
        aggregationArray[0].should.have.property("$match");
        aggregationArray[1].should.have.property("$project");


        done();
    })
    it("should have a mutated project statement",(done)=>{
        let str=`match 'name eq 'abc'' 
         THEN project '_id,name contains 'object eq someMatch',created,Logging $SomeText.0'`;
        let aggregationArray = ParseAggregate(str);

        aggregationArray.should.be.a("Array");
        aggregationArray.should.have.length(2);
        aggregationArray[0].should.have.property("$match");
        aggregationArray[1].should.have.property("$project");


        done();
    })
    describe("Lookup function",()=>{
//grades contains 'grade eq 'B'
        it("should contain and object with correct values",(done)=>{
            let str = "lookup 'FROM users WHERE thisprop=otherprop AS somethingElse'";
            let obj = lookupParser(str);
            obj.should.be.a("Object");
            obj.should.have.property("$lookup")
                .that.is.a("Object");
            obj["$lookup"].should.have.property('from').that.equals("users");
            obj["$lookup"].should.have.property('foreignfield').that.equals("otherprop");
            obj["$lookup"].should.have.property('localfield').that.equals("thisprop");
            obj["$lookup"].should.have.property('as').that.equals("somethingElse");
            done();
        })
        it("should contian and object",(done)=>{
            let str = "lookup 'WHERE thisprop eq otherprop AS somethingElse FROM users'";
            let obj = lookupParser(str);
            obj.should.be.a("Object");
            obj.should.have.property("$lookup")
                .that.is.a("Object");
            obj["$lookup"].should.have.property('from').that.equals("users");
            obj["$lookup"].should.have.property('foreignfield').that.equals("otherprop");
            obj["$lookup"].should.have.property('localfield').that.equals("thisprop");
            obj["$lookup"].should.have.property('as').that.equals("somethingElse");
            done();
        })

    })
})