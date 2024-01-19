const { MongoClient } = require("mongodb");

const databaseName = "MyDb";

let dbConnections;
const uri =
  `mongodb+srv://chrisryce5001:rajat123@cluster0.km47xja.mongodb.net/?retryWrites=true&w=majority`
module.exports = {
  connectToDb: async (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        console.log("Connection established");
        dbConnections = client.db();
        return cb();
      })
      .catch((err) => {
        console.log("Error: " + err);
        return cb(err);
      });
  },
  getDb: () => dbConnections,
};
