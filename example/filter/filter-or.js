const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "firstName eq 'mickey' OR lastName eq 'donald'"
}

let parsed = mongoQP.ParseQuery(testObj);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {
    "$or": [
      {
        "firstName": {
          "$eq": "mickey"
        }
      },
      {
        "lastName": {
          "$eq": "donald"
        }
      }
    ]
  }
}
*/