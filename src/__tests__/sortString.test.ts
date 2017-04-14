import * as chai from "chai";
const should = chai.should();
import { ssParser } from "../parseSortString";


let testStr=[
    "name asc",
    "name desc",
    "'name asc'",
    "'name desc'",
    "name asc, name desc",
    "'name asc, name desc'",
    "'name asc', 'name desc'",
    "''name asc', 'name desc''",

]
describe("#ParseSortString",()=>{

    testStr.map(item => {
        it(`should return and array of items`, (done) => {
            let operator = ssParser(item);
            operator.should.be.a("array");
            operator[0].should.be.a("array");
            done();
        });
    });

})