import * as chai from "chai";
const should = chai.should();
import { ParseQuery } from "../../index";


describe.only("All Query Parameters have working aliases",()=>{
    it("should replace top with limit",(done)=>{
        let params = {$top:1};
        let obj=ParseQuery(params);
        obj.should.haveOwnProperty("limit")
        done();
    })
})