import { ParseAggregate } from "../ParseAggregate";
import { lookupParser } from "../parseAggregateQuery/lookupParser";

describe("#ParseAggregate",()=>{

     it("should be an array and have proper values",()=>{
         let str=`match 'name eq 'abc'' 
         THEN project '_id,name,created' 
         THEN sort 'last asc, name' 
         THEN unwind 'path name,preserveNullAndEmptyArrays true'`;
         let aggregationArray = ParseAggregate(str);
        expect(Array.isArray(aggregationArray)).toBeTruthy();
        expect(aggregationArray).toHaveLength(4);
        expect(aggregationArray[0]).toHaveProperty("$match");
        expect(aggregationArray[1]).toHaveProperty("$project");
        expect(aggregationArray[2]).toHaveProperty("$sort");
        expect(aggregationArray[3]).toHaveProperty("$unwind");
    });

    it("should have a mutated project statement",()=>{
        let str=`match 'name eq 'abc'' 
         THEN project '_id,name,created,Logging $SomeText.0'`;
        let aggregationArray = ParseAggregate(str);
		expect(Array.isArray(aggregationArray)).toBeTruthy();
		expect(aggregationArray).toHaveLength(2);
       expect(aggregationArray[0]).toHaveProperty("$match");
       expect(aggregationArray[1]).toHaveProperty("$project");
    })
    it("should have a mutated project statement",()=>{
        let str=`match 'name eq 'abc'' 
         THEN project '_id,name contains 'object eq someMatch',created,Logging $SomeText.0'`;
        let aggregationArray = ParseAggregate(str);
		expect(Array.isArray(aggregationArray)).toBeTruthy();
		expect(aggregationArray).toHaveLength(2);
       expect(aggregationArray[0]).toHaveProperty("$match");
       expect(aggregationArray[1]).toHaveProperty("$project");
    })
    describe("Lookup function",()=>{
        it("should contain and object with correct values",()=>{
            let str = "lookup 'FROM users WHERE thisprop=otherprop AS somethingElse'";
            let obj = lookupParser(str);
            expect(obj).toMatchObject({from:'users',foreignField:'otherprop',localField:'thisprop',as:'somethingElse'});
        });
    });
    describe("Parsing Each Aggregate Function",()=>{
        it("should parse a simple match object",()=>{
            let str="match 'Name eq B'";
            let aggregate=ParseAggregate(str)
            expect(aggregate.length).toEqual(1)
            expect(aggregate).toEqual([{$match:{Name:{'$eq':"B"}}}]);
            
        })
        it("should parse a simple lookup object",()=>{
            let str="lookup 'FROM otherCollection WHERE name=id AS newName'";
            let aggregate=ParseAggregate(str);
            expect(aggregate.length).toEqual(1);
            expect(aggregate).toEqual([{
                '$lookup': { from: 'otherCollection',
                    localField: 'name',
                    foreignField: 'id',
                    as: 'newName' }
            }])
        });
        it("should parse a simple project object",()=>{
            let str="project '_id,name,address'";
            let aggregate=ParseAggregate(str);
            expect(aggregate.length).toEqual(1);
            expect(aggregate).toEqual([{ '$project': { _id: 0, name: 1, address: 1 } }])
            
        });
        it("should parse a complex project object",()=>{
            let str="project '_id $name,name $name.first,address'";
            let aggregate=ParseAggregate(str)
            expect(aggregate.length).toEqual(1);
            expect(aggregate).toEqual([{ '$project': { _id: '$name', name: '$name.first', address: 1 } }] )
            
        })
        it("should parse a simple sort object",()=>{
            let str="sort 'last asc, name, first desc'";
            let aggregate=ParseAggregate(str);
            expect(aggregate.length).toEqual(1);

            expect(aggregate).toEqual([{"$sort":{"last":1,"name":1,"first":-1}}])
            
        })
    })
})