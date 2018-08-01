import { getProjection } from "../parseProjectionString";

describe("#getProjection",()=>{
    describe("Working with exclude and include",()=>{
        it("should include _id",(done)=>{
            let projection=getProjection("_id");
            projection.should.have.property("_id").that.equals(1);
            done();
        });
        it("should exclude _id with exclude parameter",(done)=>{
            let projection=getProjection("exclude _id");
            projection.should.have.property("_id").that.equals(0);
            done();
        });
        it("should include _id with include parameter",(done)=>{
            let projection=getProjection("include _id");
            projection.should.have.property("_id").that.equals(1);
            done();
        });
        it("should exclude name and _id",(done)=>{
            let projection=getProjection("exclude _id,name");
            projection.should.have.property("_id").that.equals(0);
            projection.should.have.property("name").that.equals(0);
            done();
        });
        it("should include name and exclude _id",(done)=>{
            let projection=getProjection("include _id,name");
            projection.should.have.property("_id").that.equals(0);
            projection.should.have.property("name").that.equals(1);
            done();
        });
        it("should include projection when there is a space in the value",(done)=>{
            let projection=getProjection("include this key");
            projection.should.have.property("this key").that.equals(1);
            done();
        })
        it("should include projection when there is a space in the value",(done)=>{
            let projection=getProjection("this key,something,My Other Stuff");
            projection.should.have.property("this key").that.equals(1);
            projection.should.have.property("something").that.equals(1);
            projection.should.have.property("My Other Stuff").that.equals(1);
            done();
        })
    })
    it("should include name",(done)=>{
        let projection=getProjection("name");
        projection.should.have.property("name").that.equals(1);
        done();
    });
    it("should include name with include parameter",(done)=>{
        let projection=getProjection("include name");
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
    it("should include multiple simple projections",(done)=>{
        let projection=getProjection("exclude name,title,description");
        projection.should.have.property("name").that.equals(0);
        projection.should.have.property("title").that.equals(0);
        projection.should.have.property("description").that.equals(0);
        done();
    });
    it("should return an elemMatch parsed projection with no subcomparison",(done)=>{
        let str = "subdoc contains 'title eq 'abc'";
        let parsedProjection=getProjection(str);
        parsedProjection.should.not.have.property("_id");
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
    it("should return an elemMatch parsed projection with AND operator",(done)=>{
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
		parsedProjection["subdoc"].should.deep.equal({"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}});
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
    it("should return an elemMatch parsed projection with included documents",(done)=>{
        let str = "include subdoc contains 'title eq 'abc' {OR} score eq 23',_id,name";
        let parsedProjection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        parsedProjection.should.have.property("_id").that.equals(0);
        parsedProjection.should.have.property("name").that.equals(1);
        parsedProjection.should.have.property("subdoc").is.an("object");
        parsedProjection["subdoc"]
            .should.have.property("$elemMatch")
            .that.is.an("object")
            .that.has.property("$or")
            .that.is.an("array");
        done();
    })
    it("should return an elemMatch parsed projection with excluded documents",(done)=>{
        let str = "exclude subdoc contains 'title eq 'abc' {OR} score eq 23',_id,name";
        let parsedProjection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        parsedProjection.should.have.property("_id").that.equals(0);
        parsedProjection.should.have.property("name").that.equals(0);
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
		parsedProjection.should.have.property("_id").that.equals(0);
		parsedProjection.should.have.property("address").that.eq(1);
		parsedProjection.should.have.property("name").that.eq(1);
		done();
	});

})