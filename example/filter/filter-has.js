const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "firstName eq 'mickey' AND has firstName"
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
        "firstName": {
          "$eq": "mickey"
        }
      },
      {
        "firstName": {
          "$exists": true
        }
      }
    ]
  }
}
*/