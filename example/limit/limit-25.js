const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "firstName eq 'mickey'",
    project: "firstName, lastName",
    limit: 25
}

let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {
    "firstName": {
      "$eq": "mickey"
    }
  },
  "project": {
    "_id": 0,
    "firstName": 1,
    "lastName": 1
  },
  "limit": 25
}
*/