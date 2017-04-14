import * as chai from "chai";
const should = chai.should();
import { getProjection } from "../parseProjectionString";


describe.only("#getProjection",()=>{
    it("",(done)=>{
        let str = "name contains 'object eq 'abc' {AND} score eq 23',_id";
        let parsedProjection=getProjection(str);
        console.log(JSON.stringify(parsedProjection));
        done();
    })
})