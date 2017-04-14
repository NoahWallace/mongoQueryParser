const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "isAdmin eq false",
    sort: "assocId asc, userName desc"
}

let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************

  "filter": {
    "isAdmin": {
      "$eq": false
    }
  },
  "sort": [
    [
      "assocId",
      1
    ],
    [
      "userName",
      -1
    ]
  ]
}
*/