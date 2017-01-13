import * as chai from "chai";
const should = chai.should();
import { ParseAggregate } from "../index";


describe("#ParseAggregate",()=>{
    let str="match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last asc, name' THEN unwind 'path name,preserveNullAndEmptyArrays true'";
    it("blah blah blah",(done)=>{
        ParseAggregate(str);
        done();
    })
})