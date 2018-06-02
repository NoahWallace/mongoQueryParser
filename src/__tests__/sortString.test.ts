
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
// TODO: change tests to individuals instead of dynamic
describe("#ParseSortString",()=>{

    testStr.map(item => {
        it(`should return and array of items from - ${item}`, () => {
            let operator = ssParser(item, false);

            
        });
        it(`should return an object from - ${item} `, () => {
            let operator = ssParser(item, true);

            
        });
    });

})