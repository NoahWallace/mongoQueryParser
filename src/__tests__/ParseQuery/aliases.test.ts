import { ParseQuery } from "../../index";


describe("All Query Parameters have working aliases",()=>{
    const params1 = {
        $top:1,
        $filter:"name eq 'abc'",
        $select:"_id,name",
        $skip:1,
        $orderby:"name asc",
    };
    const params2 = {
        $limit:1,
        $filter:"name eq 'abc'",
        $project:"_id,name",
        $skip:1,
        $sort:"name asc",
    };
    let obj1=ParseQuery(params1);
    let obj2=ParseQuery(params2);
    it("should return property limit",()=>{
        expect(obj1).toHaveProperty("limit");
        expect(obj2).toHaveProperty("limit");
        
    });
    it("should return property filter",()=>{
        expect(obj1).toHaveProperty("filter");
        expect(obj2).toHaveProperty("filter");
        
    });
    it("should return property project",()=>{
        expect(obj1).toHaveProperty("projection");
        expect(obj2).toHaveProperty("projection");
        
    });
    it("should return property skip",()=>{
        expect(obj1).toHaveProperty("skip");
        expect(obj2).toHaveProperty("skip");
        
    });
    it("should return property sort",()=>{
        expect(obj1).toHaveProperty("sort");
        expect(obj2).toHaveProperty("sort");
        
    });
    it("should return keys or values",()=>{
        expect(obj1).toHaveProperty("limit");
        expect(obj2).toHaveProperty("limit");
        expect(obj1).toHaveProperty("skip");
        expect(obj2).toHaveProperty("skip");
        expect(obj1).toHaveProperty("projection");
        expect(obj2).toHaveProperty("projection");
        expect(obj1).toHaveProperty("filter");
        expect(obj2).toHaveProperty("filter");
        expect(obj1).toHaveProperty("sort");
        expect(obj2).toHaveProperty("sort");



        
    })
})