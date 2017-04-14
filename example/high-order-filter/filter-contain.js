const mongoQP = require('mongo-qp');
const testObj = {
    project:"name contains 'score eq 'abc'',_id"
}
let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {},
  "project": {
    "_id": 1,
    "name": {
      "$elemMatch": {
        "score": {
          "$eq": "abc"
        }
      }
    }
  }
}
*/