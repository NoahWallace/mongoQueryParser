const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "age lt 18 AND year gt 2018"
}

let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {
    "$and": [
      {
        "age": {
          "$lt": 18
        }
      },
      {
        "year": {
          "$gt": 2018
        }
      }
    ]
  }
}
*/