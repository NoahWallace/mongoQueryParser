import { ParseQuery } from "../../index";

describe("Evaluate all filter operators",()=>{
	// Comparison
	it("should evaluate the eq operator",(done)=> { const str="name eq 'abc'";  let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$eq":"abc"}}});   done()});
	it("should evaluate the gt operator",(done)=> { const str="name gt 'abc'";  let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$gt":"abc"}}});   done()});
	it("should evaluate the gte operator",(done)=>{ const str="name gte 'abc'"; let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$gte":"abc"}}});  done()});
	it("should evaluate the in operator",(done)=> { const str="name in 'abc'";  let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$in":["abc"]}}}); done()});
	it("should evaluate the nin operator",(done)=>{ const str="name nin 'abc'"; let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$nin":["abc"]}}});done()});
	it("should evaluate the lt operator",(done)=> { const str="name lt 'abc'";  let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$lt":"abc"}}});   done()});
	it("should evaluate the lte operator",(done)=>{ const str="name lte 'abc'"; let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$lte":"abc"}}});  done()});
	it("should evaluate the ne operator",(done)=> { const str="name ne 'abc'";  let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$ne":"abc"}}});   done()});

	// Logical
	it("should contain $and on top level",(done)=> { const str="name ne 'abc' AND name ne 'def'"; let p=ParseQuery(str); p.should.deep.equal( {filter:{"$and":[{"name":{"$ne":"abc"}},{"name":{"$ne":"def"}}]}}); done()});
	it("should contain $or on top level",(done)=>  { const str="name eq 'abc' OR name eq 'def'";  let p=ParseQuery(str); p.should.deep.equal( {filter:{"$or": [{"name":{"$eq":"abc"}},{"name":{"$eq":"def"}}]}}); done()});
	it("should contain $nor on top level",(done)=> { const str="name eq 'abc' NOR name eq 'def'"; let p=ParseQuery(str); p.should.deep.equal( {filter:{"$nor":[{"name":{"$eq":"abc"}},{"name":{"$eq":"def"}}]}}); done()});
	it("should contain $not on top level",(done)=> { const str="name not eq 'abc'";               let p=ParseQuery(str); p.should.deep.equal( {filter:{"name":{"$not": {"$eq":"abc"}}}}); done()});

	//Element
	it("should contain $exists on top level",(done)=> { const str="has name"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$exists":true}}});     done()});
	it("should contain $exists on top level",(done)=> { const str="!has name"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$exists":false}}});   done()});
	it("should contain $type on top level",(done)=>   { const str="name type 'Array'"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$type":'Array'}}});      done()});
	it("should contain $type on top level using is",(done)=> { const str="name is 'Array'"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$type":'Array'}}}); done()});

	// Evaluation
	/*
	 * TODO: $expr,$jsonSchema,$text,$where(operator)
	 */
	it("should contain $mod on identifier level",(done)=>   { const str="qty mod 4,0"; let p=ParseQuery(str);console.log(JSON.stringify(p)); p.should.deep.equal({filter:{"qty":{"$mod":[4,0]}}}); done()});
	it("should contain $regex on identifier level",(done)=> { const str="key regex '/something/i'"; let p=ParseQuery(str); p.should.deep.equal({filter:{"key":{"$regex":/something/i}}}); done()});

	// Geospacial
	/*
	 * TODO: $geoIntersects,$geoWithin,$near,$nearSphere
	 */

	// Array
	it("should contain $all on top level",(done)=> { const str="name all 'Joe','Burt','Ernie'"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$all":["Joe","Burt","Ernie"]}}}); done()});
	it("should contain $elemmatch on top level",(done)=> { const str="name contains 'name eq 'Joe''"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$elemMatch":{"name":{"$eq":"Joe"}}}}}); done()});
	it("should contain $size on top level",(done)=> { const str="name size 0"; let p=ParseQuery(str); p.should.deep.equal({filter:{"name":{"$size":0}}}); done()});

	//BITWISE
	/*
	 * TODO : $bitsAllClear,$bitsAllSet,$bitsAnyClear,$bitsAnySet
	 */

	// Comments
	/*
	 * TODO: $comment
	 */

})