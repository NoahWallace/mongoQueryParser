
import { setOperator } from "../parseFilterString/setOperator";

describe("#setOperator", () => {
    let notop = [ "not $eq", "not $gt", "not $gte", "not $lt", "not $lte", "not $ne", "not $in", "not $nin" ];
    let op = [ "$eq", "$gt", "$gte", "$lt", "$lte", "$ne", "$in", "$nin" ];
    let pairedop = [["$is","$type"],["$type","$type"]];
    describe("truthy operators", () => {
        it("should return an object", () => {
            const str = "name eq abc";
            let operator = setOperator(str);
            expect(operator).toEqual({falsy:false,operator:"$eq"})

            
        });
        it("should return have a property of falsy that is false", () => {
            const str = "name eq 'abc'";
            let operator = setOperator(str);
            expect(operator).toEqual({falsy:false,operator:"$eq"});

            
        });

        op.map(item => {
            it(`should return have a property of operator equal to ${item}`, () => {
                const str = `name ${item.replace("$", "")} 'abc'`;
                let operator = setOperator(str);
                expect(operator.operator).toEqual(item);
                
            });
        });
        pairedop.map(item => {
            it(`should pass operator ${item[0]} and return and object that has property of ${item[1]}`, () => {
                const str = `name ${item[0].replace("$", "")} 'abc'`;
                let operator = setOperator(str);
                expect(operator.operator).toEqual(item[1]);
                
            });
        });
    });
    describe("falsy operators", () => {
        notop.map(item => {
            it(`should return have a property of falsy that is true -${item}`, () => {
                const str = `name ${item.replace("$", "")} 'abc'`;
                let operator = setOperator(str);
                expect(operator).toEqual({ falsy:true,operator:item.replace("not ", "")});
            });
        });
    });
    describe("invalid strings", () => {
        it(`should return a null value for operator`, () => {
            const str = "associate.id equal 'abc'";
            let operator = setOperator(str);
            expect(operator).toEqual({falsy:false, operator:null});
        });
    });
});
