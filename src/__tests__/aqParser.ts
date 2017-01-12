import * as chai from "chai";
const should = chai.should();
import { ParseAggregate } from "../index";


describe.only("#ParseAggregate",()=>{
    let str="match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last,name'";
    it("blah blah blah",(done)=>{
        ParseAggregate(str);
        done();
    })
})