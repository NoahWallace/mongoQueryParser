import * as chai from "chai";
const should = chai.should();
import { getProjection } from "../parseProjectionString";


describe.only("#getProjection",()=>{
    it("",(done)=>{
        let str = "name contains 'object eq 'abc'',_id";
        console.log(JSON.stringify(getProjection(str)))
        done();
    })
})