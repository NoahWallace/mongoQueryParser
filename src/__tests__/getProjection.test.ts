import * as chai from "chai";
const should = chai.should();
import { getProjection } from "../parseProjectionString";


describe.only("#getProjection",()=>{
    it("should return an elemMatch parsed projection",(done)=>{
        let str = "name contains 'object eq 'abc' {AND} score eq 23',_id";
        let parsedProjection=getProjection(str);
        parsedProjection.should.haveOwnProperty("_id");
        parsedProjection._id.should.eq(0);
        parsedProjection.should.haveOwnProperty("name");
        parsedProjection["name"].should.deep.equal({"$elemMatch":{"$and":[{"object":{"$eq":"abc"}},{"score":{"$eq":23}}]}});
        done();
    })
	it("should return a simple projection object",(done)=>{
		let str = "name, address,_id";
		let parsedProjection=getProjection(str);
		parsedProjection.should.haveOwnProperty("_id");
		parsedProjection._id.should.eq(0);
		parsedProjection.should.haveOwnProperty("address");
		parsedProjection["address"].should.eq(1);
		parsedProjection.should.haveOwnProperty("name");
		parsedProjection["name"].should.eq(1);
		done();
	})
	it("should contain _id with a value of 1",(done)=>{
		let str = "name";
		let parsedProjection=getProjection(str);
		console.log(parsedProjection)
		parsedProjection.should.haveOwnProperty("_id");
		parsedProjection._id.should.eq(1);
		done();
	})
})