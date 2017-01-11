import * as chai from "chai";
const should = chai.should();
import * as mongo from "mongodb";
import { ParseMongo } from "../index";
let MongoClient = mongo.MongoClient;

describe("mongodb live testing", () => {
    let url = "mongodb://localhost:27017/ceh01b";
    MongoClient.connect(url).then((db) => {
        let collection = db.collection("users");
        let queryObj = {
            filter:  "assocId eq '225101' OR associate.first_name eq Dmitri",
            project: "assocId,_id,associate.first_name",
            //sort: "assocId desc"
            //skip:    3,
            //limit:   2
        };
        let query = ParseMongo(queryObj);
        let cursor = collection.find(query.filter, query.project);
        cursor
            .skip(query.skip || 0)
            .limit(query.limit || 0)
            .sort(query.sort || null)
            .toArray((err, items) => {

            db.close();
        });

    }),
        (err) => {
            console.log(err);
        };
});
// Connection url
