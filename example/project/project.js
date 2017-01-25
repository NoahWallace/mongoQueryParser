const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "firstName eq 'mickey'",
    project: "firstName, lastName"
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
  }
}
*/