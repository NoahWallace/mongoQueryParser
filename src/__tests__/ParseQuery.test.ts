import { ParseQuery } from "../index";

describe('#ParseQuery', () => {
	describe("Contain a date object in the filter", () => {
		it("return a filter object with a date value", () => {
			let query = {$filter: "updated_at lt 'Date(2018-01-01)'"};
			let obj = ParseQuery(query);
			expect(obj).toMatchObject({
				filter: {
					updated_at: {
						$lt: new Date('2018-01-01')
					}
				}
			});
		})
	});
	describe("Aliases should resolve properly", () => {

		it("should return an object that contains a simple filter", () => {
			let query = {$filter: "name eq 'abc'"};
			let obj = ParseQuery(query);
			expect(obj).toMatchObject({filter: {name: {$eq: 'abc'}}});

		});
		it("should return an object that contains a simple filter", () => {
			let query = {$top: 1, $skip: 1, $orderby: "name asc", $select: "_id,name"};
			let obj = ParseQuery(query);

			expect(obj).toMatchObject({
				filter: {},
				limit: 1,
				skip: 1,
				sort: [
					[ "name", 1 ]
				],
				projection: {
					_id: 0,
					name: 1
				}
			})
		})
	})
	describe("Pass a string to Function", () => {
		let str = "name eq 'abc'";
		let obj = ParseQuery(str);
		it("should return an object that contains filter", () => {
			expect(obj).toMatchObject({filter: {name: {$eq: 'abc'}}});

		})

	})
	describe("Contains Projection Object", () => {
		it("should return an object that contains projection", () => {
			let query = ParseQuery({project: 'name $Name'});
			expect(query).toMatchObject({projection: {name: "$Name"}});

		})
		it("should return an object that contains projections", () => {
			let query = ParseQuery({
				filter: "name eq 'abc' AND storeNum eq 243",
				project: 'name $storeNum, _id, storeNum'
			});
			expect(query).toMatchObject({
				projection: {
					name: '$storeNum',
					_id: 0,
					"storeNum": 1
				},
				filter: {
					$and: [
						{name: {$eq: "abc"}},
						{storeNum: {$eq: 243}}
					]
				}
			})
		});
		it("should have a and object with a or sub object ", () => {
			let query = ParseQuery("name eq 'Wallace' AND (title eq 'CEO' OR jobTitle eq 'CEO')");
			expect(query).toEqual({
				"filter": {
					"$and": [
						{"name": {"$eq": "Wallace"}},
						{
							"$or": [
								{"title": {"$eq": "CEO"}},
								{"jobTitle": {"$eq": "CEO"}} ]
						} ]
				}
			})

		})
		it("should have a and object with a or sub object ", () => {
			let query = ParseQuery("name eq 'abc' AND name eq 'def' OR name eq 'ghi'");
			expect(query).toEqual({
				"filter": {
					"$or": [ {
						"$and": [
							{"name": {"$eq": "abc"}},
							{"name": {"$eq": "def"}} ]
					},
						{"name": {"$eq": "ghi"}} ]
				}
			})

		})
		it("should have a and object with a or sub object ", () => {
			let query = ParseQuery("(name eq 'abc' AND name eq 'def') OR name eq 'ghi'");
			expect(query).toEqual({
				"filter": {
					"$or": [
						{
							"$and": [
								{"name": {"$eq": "abc"}},
								{"name": {"$eq": "def"}} ]
						},
						{"name": {"$eq": "ghi"}} ]
				}
			});

		})
		it("should have a and object with a or sub object ", () => {
			let query = ParseQuery("name eq 'abc' AND (name eq 'def' OR name eq 'ghi') AND name eq 'lkh'");
			expect(query).toEqual({
				"filter": {
					"$and": [
						{"name": {"$eq": "abc"}},
						{
							"$or": [
								{"name": {"$eq": "def"}},
								{"name": {"$eq": "ghi"}} ]
						},
						{"name": {"$eq": "lkh"}} ]
				}
			})
		})
	})
})