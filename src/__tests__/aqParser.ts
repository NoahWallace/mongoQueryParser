import * as chai from "chai";
const should = chai.should();
import { ParseAggregate } from "../ParseAggregate";


describe("#ParseAggregate",()=>{
    let str="match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last asc, name' THEN unwind 'path name,preserveNullAndEmptyArrays true'";
    it("should be an array and have proper values",(done)=>{
        let aggregationArray = ParseAggregate(str);
        aggregationArray.should.be.a("Array");
        aggregationArray.should.have.length(4);
        aggregationArray[0].hasOwnProperty("$match");
        aggregationArray[0].hasOwnProperty("$project");
        aggregationArray[0].hasOwnProperty("$sort");
        aggregationArray[0].hasOwnProperty("$unwind");

        done();
    })
})