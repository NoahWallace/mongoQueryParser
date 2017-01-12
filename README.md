Mongo Query Parser
==================

## Problem

Using the native mongo db driver for node, It is neccesary to easily pass a set of strings that will define the query objects

## Solution

This solution allows a front end developer to use plain language text to query a nodejs/mongodb api.


##Usage

### Node

```
npm install mongo-qp
```

 
```
//es6 js
let parser = require('mongo-qp')
let ParseQuery= parser.ParseQuery;

let query =ParseQuery(req.query)

//typescript 2.1
import {ParseQuery} from 'mongo-qp'

let query =ParseQuery(req.query:Object | string)
```
### Query

```
http://somedomain.com?filter=name eq 'abc' OR somenumber gt 1&limit=10&sort=name asc,created desc&project=_id,name,somenumber

req.query={
    filter:"name eq 'abc' OR somenumber gt 1",
    limit:10,
    sort:'name asc,created desc',
    project:"_id,name,somenumber"

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
   "project":{
      "_id":0,
      "name":1,
      "somenumber":1
   }
}

*/

```

### Object Parameters

| key   | initial type | return type |Comment|
|:----  |:------------:|:-----------:|:-------|
|filter |string        |Object       ||
|project|string        |Object       |Comma separated keys (ie "_id,key1,key2")|
|skip   |number        |Number       |                                         |
|limit  |number        |Number       |                                         |
|sort   |string        |Object       |Comma separate keys with type (ie "name asc, id desc")

NOTE: ParseQuery accepts a single parameter of either a object or a string. passing a string will return an object with the filter key only.

## Rules

### Filter String

#### AND OR NOT

AND OR and NOT are required to be capital. First split is on OR then AND then NOT

1. EXAMPLE "a eq b OR c eq d" returns EXAMPLE A below
2. EXAMPLE "a eq b OR c eq d AND e eq f" returns EXAMPLE B below
3. EXAMPLE "c eq d AND e eq f" returns EXAMPLE C below

When using contains internal operators MUST be wrapped in curly brackets
1. Example "grades contains 'grade eq 'B' {AND} score eq 23'" returns EXAMPLE D below
	
	
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
|eq       | '\<string\>' or \<number\>  |                                          |
|gt       | '\<string\>' or \<number\>  |                                          |
|gte      | '\<string\>' or \<number\>  |                                          |
|lt       | '\<string\>' or \<number\>  |                                          |
|lte      | '\<string\>' or \<number\>  |                                          |
|ne       | '\<string\>' or \<number\>  |                                          |
|in       | ['\<string\>' or \<number\>] | Comma Separated string (ie 'abc','def',123)] |
|nin      | ['\<string\>' or \<number\>] | Comma Separated string (ie 'abc','def',123)] |
|is<type> | '\<string\>' or \<number\> | value as referenced here [mongodb](https://docs.mongodb.com/manual/reference/operator/query/type/#document-type-available-types)|
|mod      | ['<number(divisor)>,<number(remainder)>] | Comma Separated string with length of 2 (ie 4,0)|
|regex    | '\<string\>' or ['\<string\>']|Requires a regex string pattern that starts with / and ends with /. (gim) is optional|
|all      | ['\<string\>' or \<number\>] |Comma Separated string (ie 'abc','def',123)]|
|size     |  \<number\>                 |                                           |
|contains | queryString                 |Add query string surrounded by single quotes<br/> EXCEPTION : any logical operators(AND\|OR\|NOR) inside the string MUST be wrapped in brackets ( {AND} )|


NOTE: Any Operator in the above list can be prefaces with 'not' (ie name not eq 'abc')

NOTE: ALL string values must be wrapped in apos

### Sort String

Sort string is a paired array where the second argument is either "asc" or "desc". the second argument is optional and will assume asc. a comma separated string is required.

```
	sort:"name asc,id desc"
	returns [["name","asc"],["id", "desc"]]
	
	sort:name 
	returns "name"

	sort:"name asc,id"
	returns [["name","asc"],"id"]

```



