import { getProjection } from "../parseProjectionString";

describe("#getProjection",()=>{
    describe("Working with exclude and include",()=>{
        it("should include _id",()=>{
            let projection=getProjection("_id");
            expect(projection).toHaveProperty("_id",1);
            
        });
        it("should exclude _id with exclude parameter",()=>{
            let projection=getProjection("exclude _id");
            expect(projection).toHaveProperty("_id",0)
            
        });
        it("should include _id with include parameter",()=>{
            let projection=getProjection("include _id");
            expect(projection).toHaveProperty("_id",1);
            
        });
        it("should exclude name and _id",()=>{
            let projection=getProjection("exclude _id,name");
            expect(projection).toHaveProperty("_id",0);
            expect(projection).toHaveProperty("name",0);
            
        });
        it("should include name and exclude _id",()=>{
            let projection=getProjection("include _id,name");
            expect(projection).toHaveProperty("_id",0);
            expect(projection).toHaveProperty("name",1);
            
        });
    })
    it("should include name",()=>{
        let projection=getProjection("name");
        expect(projection).toHaveProperty("name",1);
        
    });
    it("should include name with include parameter",()=>{
        let projection=getProjection("include name");
        expect(projection).toHaveProperty("name",1);
        
    });
    it("should include multiple simple projections",()=>{
        let projection=getProjection("name,title,description");
        expect(projection).toHaveProperty("name",1);
        expect(projection).toHaveProperty("title",1);
        expect(projection).toHaveProperty("description",1);
        
    });
    it("should include multiple simple projections",()=>{
        let projection=getProjection("exclude name,title,description");
        expect(projection).toHaveProperty("name",0);
        expect(projection).toHaveProperty("title",0);
        expect(projection).toHaveProperty("description",0);
        
    });
    it("should return an elemMatch parsed projection with no subcomparison",()=>{
        let str = "subdoc contains 'title eq 'abc'";
        let projection=getProjection(str);
        expect(projection).not.toHaveProperty("_id");
        expect(projection).toHaveProperty("subdoc", {$elemMatch:{title:{$eq:"abc"}}})
        
    });
    it("should return an elemMatch parsed projection with AND operator",()=>{
        let str = "subdoc contains 'title eq 'abc' {AND} score eq 23',_id";
        let projection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        expect(projection).toHaveProperty("_id",0);
        expect(projection).toHaveProperty("subdoc",{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}});
		expect(projection).toEqual({_id:0,subdoc:{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}});
        
    })


    it("should return an elemMatch parsed projection",()=>{
        let str = "subdoc contains 'title eq 'abc' {OR} score eq 23',_id";
        let projection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        expect(projection).toHaveProperty("_id",0);
        expect(projection).toHaveProperty("subdoc",{"$elemMatch":{"$or":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}});
		expect(projection).toEqual({_id:0,subdoc:{"$elemMatch":{"$or":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}});
    })
    it("should return an elemMatch parsed projection with included documents",()=> {
		let str = "include subdoc contains 'title eq 'abc' {OR} score eq 23',_id,name";
		let projection = getProjection(str);
		// {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
		expect(projection).toHaveProperty("_id", 0);
		expect(projection).toHaveProperty("name", 1);
	});
    it("should return an elemMatch parsed projection with excluded documents",()=>{
        let str = "exclude subdoc contains 'title eq 'abc' {OR} score eq 23',_id,name";
        let projection=getProjection(str);
        // {"_id":0,"subdoc":{"$elemMatch":{"$and":[{"title":{"$eq":"abc"}},{"score":{"$eq":23}}]}}}
        expect(projection).toHaveProperty("_id",0);
        expect(projection).toHaveProperty("name",0);
    });
	it("should return a simple projection object",()=>{
		let str = "name, address,_id";
		let projection=getProjection(str);
		expect(projection).toHaveProperty("_id",0);
		expect(projection).toHaveProperty("address",1);
		expect(projection).toHaveProperty("name",1)
		
	});
});
