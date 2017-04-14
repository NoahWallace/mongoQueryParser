const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "age gt 18"
}

let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {
    "age": {
      "$gt": 18
    }
  }
}
*/