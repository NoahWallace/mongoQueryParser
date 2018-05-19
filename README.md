mongo-qp
==================

## Problem

Using the native mongo db driver for node, It is necessary to easily pass a set of strings that will define the query objects

## Solution

This solution allows a front end developer to use plain language text to query a nodejs/mongodb api.
This package was build on the standard for [MongoDb Node.JS Driver Version 2.2](http://mongodb.github.io/node-mongodb-native/2.2/api/)

## Usage
Notes:
V1.3.0 is a dependancy update ONLY

### Node

```
npm install mongo-qp
```

 
```
//es6 js
    let parser = require('mongo-qp');
    let ParseQuery= parser.ParseQuery;
    let ParseAggregate= parser.ParseAggregate
    ParseQuery(queryObj[, callback]);
    ParseAggregate(str[, callback]);

//typescript 2.1
import {ParseQuery} from 'mongo-qp';

ParseQuery(req.query: Object | string[, callback:(result)=>any])
ParseAggregate(str: string[, callback:(result)=>any]);

// es5 in browser
<script src="node_modules/mongo-qp/lib/mongoqp.js"></script>
<script src="node_modules/mongo-qp/lib/mongoqp.min.js"></script>
// files are included in package
```
### Query

```
http://somedomain.com?filter=name eq 'abc' OR somenumber gt 1&limit=10&sort=name asc,created desc&projection=_id,name,somenumber

req.query={
    filter:"name eq 'abc' OR somenumber gt 1",
    limit:10,
    sort:'name asc,created desc',
    projection:"_id,name,somenumber"

}
let query =ParseQuery(req.query)
/* RESULT of query
{
   "filter":{
      "$or":[
         {
            "name":{
               "$eq":"abc"
            }
         },
         {
            "somenumber":{
               "$gt":1
            }
         }
      ]
   },
   "limit":10,
   "sort":[
      [
         "name",
         "asc"
      ],
      [
         "created",
         "desc"
      ]
   ],
   "projection":{
      "_id":1,
      "name":1,
      "somenumber":1
   }
}

*/

```

### Object Parameters

| key   | initial type | return type |Comment|
|:----  |:------------:|:-----------:|:-------|
|($)filter |string        |Object       ||
|($)project/projection/select|string        |Object       |Comma separated keys (ie "_id,key1,key2") \| can also use the include and exclude terms. (ie 'include name,_id,title' or 'exclude name,_id,title')|
|($)skip   |number        |Number       |                                         |
|($)limit/top  |number        |Number       |                                         |
|($)sort/orderby   |string        |Object       |Comma separate keys with type (ie "name asc, id desc")

NOTE: ParseQuery accepts a single parameter of either a object or a string. passing a string will return an object with the filter key only.

1.2.4 added synonyms and $ support (heading towards oData(v4))
1.2.14 added alias string to project
1.3.2 changed output of project to projection. Code still accepts project and projection
1.3.3 added support for Date() parser to create Date objects not just strings
## Rules

### Filter String

#### AND OR NOT

AND OR and NOT are required to be capital. First split is on OR then AND then NOT

1. EXAMPLE "a eq b OR c eq d" returns EXAMPLE A below
2. EXAMPLE "a eq b OR c eq d AND e eq f" returns EXAMPLE B below
3. EXAMPLE "c eq d AND e eq f" returns EXAMPLE C below

When using contains internal operators MUST be wrapped in curly brackets
1. Example "grades contains 'grade eq 'B' {AND} score eq 23'" returns EXAMPLE D below
	
(1.2.13) mongo-qp supports both dot notation and oData forward slash notation (user.name or user/name)
##### EXAMPLE A
	
```
    {"$or":[
        {"a":{"$eq":b},
        {"c":{"$eq":d})
    ]}
```
	
##### EXAMPLE B
	
```
    {"$or":[
        {"a":{"$eq":b},
        {"$and":[
            {"c":{"$eq":d},
            {"e":{"$eq":f}
        ]}
    ]}
```
##### EXAMPLE C
	
```
    {"$and":[
        {"c":{"$eq":d},
        {"e":{"$eq":f}
    ]}
```

##### EXAMPLE D

```
    {"grades":
        {"$elemMatch":
            {"$and":[
                {"grade":
                    {"$eq":"B"}
                },
                {"score":
                    {"$eq":23}
                }
            ]}
        }
    }

```

### Exists
(1.0.4)

It is possible to create a filter object that checks if an element exists by using the 'has' key word 

##### EXAMPLE

```
const str = "has name AND has id in 123,456"
```

Or you can check if a field does not exists

```
const str = "has name nin 'mickey','donald' AND !has last_name"

    {"$and":[
        {"name":{
            "$exists":true,
            "$nin":["mickey","donald"]
            }
        },
        {"last_name":{
            "$exists":false
        }
    }
]}
```

#### Operators

| Allowed | Restriction                 |Comments                                  |
|:--------| ------------------------    |:-----------------------------------------|
|eq       | '\<string\>' or \<number\> or 'Date(\<string\>)' |                                          |
|gt       | '\<string\>' or \<number\> or 'Date(\<string\>)'  |                                          |
|gte      | '\<string\>' or \<number\> or 'Date(\<string\>)'  |                                          |
|lt       | '\<string\>' or \<number\> or 'Date(\<string\>)'  |                                          |
|lte      | '\<string\>' or \<number\> or 'Date(\<string\>)'  |                                          |
|ne       | '\<string\>' or \<number\> or 'Date(\<string\>)'  |                                          |
|in       | ['\<string\>' or \<number\>] | Comma Separated string (ie 'abc','def',123)] |
|nin      | ['\<string\>' or \<number\>] | Comma Separated string (ie 'abc','def',123)] |
|is<type> | '\<string\>' or \<number\> | value as referenced here [mongodb](https://docs.mongodb.com/manual/reference/operator/query/type/#document-type-available-types)|
|mod      | ['<number(divisor)>,<number(remainder)>] | Comma Separated string with length of 2 (ie 4,0)|
|regex    | '\<string\>' or ['\<string\>']|Requires a regex string pattern that starts with / and ends with /. (gim) is optional|
|all      | ['\<string\>' or \<number\>] |Comma Separated string (ie 'abc','def',123)]|
|size     |  \<number>                 |                                           |
|contains | queryString                 |Add query string surrounded by single quotes<br/> EXCEPTION : any logical operators(AND,OR,NOR) inside the string MUST be wrapped in brackets ( {AND} )|


NOTE: Any Operator in the above list can be prefaces with 'not' (ie name not eq 'abc')

NOTE: ALL string values must be wrapped in apos

### Sort String

Sort string is a paired array where the second argument is either "asc" or "desc". the second argument is optional and will assume asc. a comma separated string is required.

```
	sort:"name asc,id desc"
	returns [["name", 1],["id", -1]] //updated 1.2.2
	
	sort:name 
	returns "name"
	sort:"name asc,id"
	returns [["name", 1],"id"] //updated 1.2.2

```


### Projection

When a Projection key is passed into the query object, mongo-qp will automatically omit the _id key (_id:0)unless requested.
(1.3.5) _id used by itself will default to include (_id:1). if using requesting multiple items with _id key, the query parser will return a omit clause id:0. Use the exclude string to run an exclusion clause (ie 'exclude _id,name,title')
exclude\|excl\|include\|incl is available for use in this syntax
#### EXAMPLE

```
    let withId = {
        project:'_id,name'
    }
    let withoutId ={
        project:'name'
    }
    let queryWithId = ParseQuery(withId)
     /*
      *returns
      *   {
      *       filter:{},
      *       projection:{_id:1,name:1}
      *   }
      */
     let queryWithoutId= ParseQuery(withoutId)
     /*
      * returns
      *   {
      *       filter:{},
      *       projection:{_id:0,name:1}
      *   }
      */

      ParseQuery({projection:'exclude _id,name'}) // {projection:{_id:0,name:0}}
      ParseQuery({projection:'exclude _id'}) // {projection:{_id:0}}
      ParseQuery({projection:'exclude name'}) // {projection:{name:0}}

      ParseQuery({projection:'include _id'}) // {projection:{_id:1}}
      ParseQuery({projection:'include _id,name'}) // {projection:{_id:0,name:1}}

 ```

The reason for this is because in mongo projection, all fields are inclusive except for _id which is an exclusive field. By omitting the field, the [aclage felt more natural

#### NOTE

Mongo 3.4 supports projection operators. mongo-qp will also support projection operators. Keep in mind that what you put in is what you get out.

**[$ (projection)](https://docs.mongodb.com/manual/reference/operator/projection/positional/#proj._S_)**

**(1.2.14)** now supports project alias

**(1.3.2)** breaking change. \<project\> key is now \<projection\>

**(1.3.5)** possible breaking change. projection will now support inclusion and exclusion. to include _id in a query, now omit _id from string

#### Example

```
    ParseQuery({ project:'name.$' })
    // { filter: {}, projection: {'name.$':1}}

    ParseQuery({ projection:'name $SomeField'})
    // { filter: {}, projection: {'name':'$SomeField'}}
```

**[$elemMatch(projection)](https://docs.mongodb.com/manual/reference/operator/projection/elemMatch/)**

**(1.1.6)** mongo-qp now supports $elemMatch(projection). Usage is the same as query. (mongodb >3.4)

#### Example

```
    ParseQuery({ project:name contains 'score eq 'abc'',_id })
    /*
     { filter: {},
        projection: {
            "_id":1,
            "name":{
                "$elemMatch": {
                    "score": {
                        "$eq":"abc"
                    }
                }
            }
        }
     }

     */
```


# Aggregation
**(1.2.0)** Now supports simple aggregation pipline querys.
**(1.2.16)** Now Supports lookup query (DB v3.2 or greater)
## Usage

Use the keyword THEN to separate operations in the query pipeline. all values MUST be wrapped in single quote

| Allowed | Restriction                 |Comments                                  |
|:--------| ------------------------    |:-----------------------------------------|
|match       | '\<string\>'             | use the match operator to return a filter query|
|sort       | '\<string\>' or \<number\>  |   Comma Separated string as above                                       |
|limit      |  \<number\>  |   number as above                                       |
|skip       |  \<number\>  |   number as above                                       |
|unwind       | '\<string\>' or \<number\>  |                                          |
|lookup       | '\<string\>'  | must contain keywords FROM,WHERE, AS |                                          |


#### Example

```javascript
 let str="match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last asc, name' THEN unwind 'path name,preserveNullAndEmptyArrays true'";
 let aggregatePipline = ParseAggregate(str)
 /*
    [ { '$match': { name: [Object] } },
      { '$project': { _id: 1, name: 1, created: 1 } },
      { '$sort': [ [Object], 'name' ] },
      { '$unwind': { path: '$name', preserveNullAndEmptyArrays: true } } ]
  */
```

```javascript
 let str="lookup 'FROM other_collection WHERE thisfield=thatfield AS newfieldname'";
 let aggregatePipline = ParseAggregate(str)
 /*
    [ { $lookup:{ from: 'other_collection', foreignfield:'thatfield', localfield:'thisfield', as: 'newfieldname'} } ]
  */
```
