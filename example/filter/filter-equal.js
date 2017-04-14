const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "name eq 'mickey'"
}

let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {
    "name": {
      "$eq": "mickey"
    }
  }
}
*/