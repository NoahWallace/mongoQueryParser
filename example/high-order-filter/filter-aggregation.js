const mongoQP = require('mongo-qp');
const str = "match 'name eq 'abc'' THEN project '_id,name,created' THEN sort 'last asc, name' THEN unwind 'path name,preserveNullAndEmptyArrays true'"
let parsed = mongoQP.ParseAggregate(str);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
[
  {
    "$match": {
      "name": {
        "$eq": "abc"
      }
    }
  },
  {
    "$project": {
      "_id": 1,
      "name": 1,
      "created": 1
    }
  },
  {
    "$sort": [
      [
        "last",
        1
      ],
      "name"
    ]
  },
  {
    "$unwind": {
      "path": "$name",
      "preserveNullAndEmptyArrays": true
    }
  }
]
*/