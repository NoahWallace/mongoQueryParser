const mongoQP = require('mongo-qp');
let testObj = {
    filter:  "firstName eq 'mickey'",
    sort: "lastName asc"
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
  "sort": [
    [
      "lastName",
      1
    ]
  ]
}
*/