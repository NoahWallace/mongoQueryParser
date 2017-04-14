import * as chai from "chai";
const should = chai.should();
import { ParseAggregate } from "../ParseAggregate";


describe("#ParseAggregate",()=>{
     it("should be an array and have proper values",(done)=>{
         let str=`match 'name eq 'abc'' 
         THEN project '_id,name,created' 
         THEN sort 'last asc, name' 
         THEN unwind 'path name,preserveNullAndEmptyArrays true'`;
         let aggregationArray = ParseAggregate(str);
        console.log(aggregationArray)
        aggregationArray.should.be.a("Array");
        aggregationArray.should.have.length(4);
        aggregationArray[0].should.haveOwnProperty("$match");
        aggregationArray[1].should.haveOwnProperty("$project");
        aggregationArray[2].should.haveOwnProperty("$sort");
        aggregationArray[3].should.haveOwnProperty("$unwind");

        done();
    })
    it("should have a mutated project statement",(done)=>{
        let str=`match 'name eq 'abc'' 
         THEN project '_id,name,created,Logging $SomeText.0'`;
        let aggregationArray = ParseAggregate(str);
        console.log(aggregationArray)
        aggregationArray.should.be.a("Array");
        aggregationArray.should.have.length(2);
        aggregationArray[0].should.haveOwnProperty("$match");
        aggregationArray[1].should.haveOwnProperty("$project");


        done();
    })
})