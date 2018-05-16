import * as chai from "chai";
const should = chai.should();
import { ssParser } from "../parseSortString";


let testStr=[
    "name asc",
    "name desc",
    "'name asc'",
    "'name desc'",
    "name asc, first desc",
    "'name asc, first desc'",
    "'name asc', 'first desc'",
    "''name asc', 'first desc''",

]
describe("#ParseSortString",()=>{

    testStr.map(item => {
        it(`should return and array of items from - ${item}`, (done) => {
            let operator = ssParser(item, false);
            operator.should.be.a("array");
            operator[0].should.be.a("array");
            done();
        });
        it(`should return an object from - ${item} `, (done) => {
            let operator = ssParser(item, true);
            operator.should.be.a("object");
            done();
        });
    });

})