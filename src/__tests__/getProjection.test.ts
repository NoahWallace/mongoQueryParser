import { getProjection } from "../parseProjectionString";

describe("#getProjection",()=>{
    it("should exclude _id",(done)=>{
        let projection=getProjection("_id");
        projection.should.have.property("_id").that.equals(0);
        done();
    });
    it("should include name",(done)=>{
        let projection=getProjection("name");
        projection.should.have.property("name").that.equals(1);
        done();
    });
    it("should include multiple simple projections",(done)=>{
        let projection=getProjection("name,title,description");
        projection.should.have.property("name").that.equals(1);
        projection.should.have.property("title").that.equals(1);
        projection.should.have.property("description").that.equals(1);
        done();
    });
    it("should return an elemMatch parsed projection",(done)=>{
        let str = "subdoc contains 'title eq 'abc'";
        let parsedProjection=getProjection(str);
        parsedProjection.should.have.property("_id").that.equals(0);
        parsedProjection.should.have.property("subdoc").is.an("object");
        parsedProjection["subdoc"]
            .should.have.property("$elemMatch")
            .that.is.an("object")
            .that.has.property("title")
            .that.is.an("object")
            .that.has.property("$eq")
            .that.equals("abc");
        done();
    });
    it("should return an elemMatch parsed projection",(done)=>{
        let str = "subdoc contains 'title eq 'abc' {AND} score eq 23',_id";
        let parsedProjection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        parsedProjection.should.have.property("_id").that.equals(0);
        parsedProjection.should.have.property("subdoc").is.an("object");
        parsedProjection["subdoc"]
            .should.have.property("$elemMatch")
            .that.is.an("object")
            .that.has.property("$and")
            .that.is.an("array");
		parsedProjection["subdoc"].should.deep.equal({"$elemMatch":{"$and":[{"object":{"$eq":"abc"}},{"score":{"$eq":23}}]}});
        done();
    })


    it("should return an elemMatch parsed projection",(done)=>{
        let str = "subdoc contains 'title eq 'abc' {OR} score eq 23',_id";
        let parsedProjection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        parsedProjection.should.have.property("_id").that.equals(0);
        parsedProjection.should.have.property("subdoc").is.an("object");
        parsedProjection["subdoc"]
            .should.have.property("$elemMatch")
            .that.is.an("object")
            .that.has.property("$or")
            .that.is.an("array");
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