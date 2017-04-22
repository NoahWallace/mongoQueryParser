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

            done();
        })
        it("should contain and object",(done)=>{
            let str = "lookup 'WHERE thisprop eq otherprop AS somethingElse FROM users'";
            let obj = lookupParser(str);

            done();
        })
        it("should contian and object",(done)=>{
            let str = "lookup 'FROM users WHERE thisprop=otherprop AS somethingElse '";
            let obj = ParseAggregate(str);


            done();
        })

    })
    describe.only("Parsing Each Aggregate Function",()=>{
        it("should parse a simple match object",(done)=>{
            let str="match 'Name eq B'";
            let parsedStr=ParseAggregate(str)
            parsedStr.should.be.a("Array").and.have.lengthOf(1);
            parsedStr[0].should.haveOwnProperty("$match")
            parsedStr[0].should.be.a("Object").that.deep.equals({$match:{Name:{'$eq':"B"}}});
            done();
        })
        it("should parse a simple lookup object",(done)=>{
            let str="lookup 'FROM otherCollection WHERE name=id AS newName'";
            let parsedStr=ParseAggregate(str)
            parsedStr.should.be.a("Array").and.have.lengthOf(1);
            parsedStr[0].should.be.a("Object").that.deep.equals({
                '$lookup':
                { from: 'otherCollection',
                    localField: 'name',
                    foreignField: 'id',
                    as: 'newName' } }
            )
            done();
        })
        it("should parse a simple project object",(done)=>{
            let str="project '_id,name,address'";
            let parsedStr=ParseAggregate(str)
            parsedStr.should.be.a("Array").and.have.lengthOf(1);
            parsedStr[0].should.be.a("Object").that.deep.equals({ '$project': { _id: 0, name: 1, address: 1 } })
            done();
        })
        it("should parse a complex project object",(done)=>{
            let str="project '_id $name,name $name.first,address'";
            let parsedStr=ParseAggregate(str)
            parsedStr.should.be.a("Array").and.have.lengthOf(1);
            parsedStr[0].should.be.a("Object").that.deep.equals({ '$project': { _id: '$name', name: '$name.first', address: 1 } } )
            done();
        })
        it("should parse a simple sort object",(done)=>{
            let str="sort 'last asc, name, first desc'";
            let parsedStr=ParseAggregate(str);
            parsedStr.should.be.a("Array").and.have.lengthOf(1);

            parsedStr[0].should.be.a("Object").that.deep.equals({"$sort":[["last",1],"name",["first",-1]]})
            done();
        })
    })
})