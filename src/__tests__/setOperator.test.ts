import * as chai from "chai";
const should = chai.should();
import { setOperator } from "../parseFilterString/setOperator";

describe("#setOperator", () => {
    let notop = [ "not $eq", "not $gt", "not $gte", "not $lt", "not $lte", "not $ne", "not $in", "not $nin" ];
    let op = [ "$eq", "$gt", "$gte", "$lt", "$lte", "$ne", "$in", "$nin" ];
    let pairedop = [["$is","$type"],["$type","$type"]];
    describe("truthy operators", () => {
        it("should return an object", (done) => {
            const str = "name eq abc";
            let operator = setOperator(str);
            operator.should.be.a("Object");
            operator.should.haveOwnProperty("falsy");
            operator.should.haveOwnProperty("operator");
            done();
        });
        it("should return have a property of falsy that is false", (done) => {
            const str = "name eq 'abc'";
            let operator = setOperator(str);
            operator.should.be.a("Object");
            operator.should.haveOwnProperty("falsy");
            operator.falsy.should.be.false;
            done();
        });

        op.map(item => {
            it(`should return have a property of operator equal to ${item}`, (done) => {
                const str = `name ${item.replace("$", "")} 'abc'`;
                let operator = setOperator(str);
                operator.operator.should.equal(item);
                done();
            });
        });
        pairedop.map(item => {
            it(`should pass operator ${item[0]} and return and object that has property of ${item[1]}`, (done) => {
                const str = `name ${item[0].replace("$", "")} 'abc'`;
                let operator = setOperator(str);
                operator.operator.should.equal(item[1]);
                done();
            });
        });
    });
    describe("falsy operators", () => {
        notop.map(item => {
            it(`should return have a property of falsy that is true -${item}`, (done) => {
                const str = `name ${item.replace("$", "")} 'abc'`;
                let operator = setOperator(str);
                operator.should.be.a("Object");
                operator.should.haveOwnProperty("falsy");
                operator.falsy.should.be.true;
                operator.operator.should.equal(item.replace("not ", ""));
                done();
            });
        });
    });
    describe("invalid strings", () => {
        it(`should return a null value for operator`, (done) => {
            const str = "associate.id equal 'abc'";
            let operator = setOperator(str);
            operator.should.be.a("Object");
            operator.should.haveOwnProperty("falsy");
            operator.falsy.should.be.false;
            should.equal(operator.operator, null);
            done();
        });
    });
});
