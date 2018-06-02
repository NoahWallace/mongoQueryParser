import { qsParser } from "../parseFilterString/queryStringParser";

describe("#parseString", () => {
	let parseString = qsParser();
	describe("Parse Operators Should work with single query", () => {
		it("should return object eq ", () => {
			const str = "name eq abc1";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$eq: "abc1"}})
		});
		it("should return object eq when using apos", () => {
			const str = "name eq 'John Doe'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$eq: "John Doe"}})

		});
		it("should return object eq boolean when using true", () => {
			const str = "name eq true";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$eq: true}})

		});
		it("should return object eq string when using 'true'", () => {
			const str = "name eq 'true'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$eq: "true"}})

		});
		it("should return falsy object eq when using apos", () => {
			const str = "name not eq 'John Doe'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$not: {$eq: "John Doe"}}})

		});
		it("should return object gt ", () => {
			const str = "name gt 123";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$gt: 123}})

		});
		it("should return object gte ", () => {
			const str = "name gte 123";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$gte: 123}})

		});
		it("should return object lt ", () => {
			const str = "name lt 123";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$lt: 123}})

		});
		it("should return object lte ", () => {
			const str = "name lte 123";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$lte: 123}})

		});
		it("should return object ne ", () => {
			const str = "name ne 123";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$ne: 123}})

		});
		it("should return object in", () => {
			const str = "name in 'abc1','def','ceh'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$in: [ 'abc1', 'def', 'ceh' ]}})

		});
		it("should return object in with number", () => {
			const str = "name in 'abc1,a term','abc, def',123";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$in: [ 'abc1,a term', 'abc, def', 123 ]}})

		});
		it("should return object nin", () => {
			const str = "name nin 'abc1','def','ceh'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {$nin: [ 'abc1', 'def', 'ceh' ]}})

		});
		it("should return object nor", () => {
			const str = "name eq abc1 NOR sale eq 123";
			let newFilter = parseString(str);

			expect(newFilter).toEqual({$nor: [ {name: {$eq:"abc1"}}, {sale:{$eq: 123}} ]})
			;
		});
		it("should return object with type using is", () => {
			const str = "name is 'array'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {"$type": "array"}})

		});
		it("should return object with type using type", () => {
			const str = "name type 'array'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {"$type": "array"}})

		});

	});
	describe("testing of exists object", () => {
		it("should return object that contains exists", () => {
			const str = "has name";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {"$exists": true}})

		});
		it("should return object that contains false exists", () => {
			const str = "!has name";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({name: {"$exists": false}})

		});
		it("should return and $and object that contains exists", () => {
			const str = "!has name AND has assocId ";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({
				$and: [
					{name: {"$exists": false}},
					{assocId: {"$exists": true}}
				]
			})

		});
		it("should return and $and object that contains exists and nin", () => {
			const str = "!has name AND has assocId nin '225101','abcdef' ";
			let newFilter = parseString(str);
			let andObj = newFilter[ "$and" ];
			expect(newFilter).toEqual({
				$and: [
					{name: {"$exists": false}},
					{assocId: {"$exists": true, $nin: [ '225101', 'abcdef' ]}}
				]
			})

		});
		it("should should be valid with has keyword and modifier", () => {
			const str = "has has AND has eq hasvalue";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({
				$and: [
					{has: {"$exists": true}},
					{has: {"$eq": "hasvalue"}}
				]
			})

		});
	})
	describe("Parse Operators Should work with complex Queries", () => {
		it("should return a valid OR object ", () => {
			const str = "name eq abc1 OR name eq def";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({
				$or: [
					{name: {$eq: "abc1"}},
					{name: {"$eq": "def"}}
				]
			})

		});
		it("should return a valid AND object ", () => {
			const str = "name eq abc1 AND name eq def";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({
				$and: [
					{name: {$eq: "abc1"}},
					{name: {"$eq": "def"}}
				]
			})

		});

		it("should return a valid AND and OR object ", () => {
			const str = "name eq abc1 AND name eq def1 OR name eq abc2 AND name eq def2";
			let p=qsParser();
			let newFilter=p(str);

			expect(newFilter).toEqual({
				$or: [
					{
						$and: [
							{name: {$eq: "abc1"}},
							{name: {$eq: "def1"}}
						]
					},
					{
						$and: [
							{name: {$eq: "abc2"}},
							{name: {$eq: "def2"}}
						]
					}
				]
			})

		});
		// "
		it("should return a valid AND and OR object with Complexities ", () => {
			const str = "name eq abc1 OR name eq def1 AND name eq abc2 AND name in 'def2','get','ple'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({
				"$or": [
					{"name": {"$eq": "abc1"}},
					{
						"$and": [
							{"name": {"$eq": "def1"}},
							{"name": {"$eq": "abc2"}},
							{"name": {"$in": [ "def2", "get", "ple" ]}}
						]
					}
				]
			})

		});
		// TODO: Finish tests for contains Operators
		it("should return a valid AND and OR object with Complexities ", () => {
			const str = "grades contains 'grade eq 'B' {AND} score eq 23'";
			let newFilter = parseString(str);
			expect(newFilter).toEqual({
				"grades": {
					"$elemMatch": {
						"$and": [
							{"grade": {"$eq": "B"}},
							{"score": {"$eq": 23}} ]
					}
				}
			})
		});
	});
});