import * as chai from "chai";
const should = chai.should();
import { getProjection } from "../parseProjectionString";


describe("#getProjection",()=>{
    it("",(done)=>{
        let str = "name contains 'object eq 'abc' {AND} score eq 23',_id";
        console.log(JSON.stringify(getProjection(str)))
        done();
    })
})