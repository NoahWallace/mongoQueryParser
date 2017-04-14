const mongoQP = require('mongo-qp');
const str = "has name nin 'mickey','donald' AND !has last_name"
let parsed = mongoQP.ParseQuery(str);
const printObj = (x) => {
    console.log(JSON.stringify(x, null, 2));
};
printObj(parsed);
/*********** output ***************
{
  "filter": {
    "$and": [
      {
        "name": {
          "$exists": true,
          "$nin": [
            "mickey",
            "donald"
          ]
        }
      },
      {
        "last_name": {
          "$exists": false
        }
      }
    ]
  }
*/