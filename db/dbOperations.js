// separated the database operations in one file
const { ObjectId } = require("bson");
const collectionName = "Blogs";

module.exports = {
  dbOperations: {
    //get all blogs-
    getAllBlogs: (databaseInstance, callback) => {
      let blogs = [];
      databaseInstance
        .collection(collectionName)
        .find()
        .sort({ createdAt: -1 })
        .forEach((blog) => {
          blogs.push(blog);
        })
        .then(() => {
          callback(blogs);
        })
        .catch((err) => {
          callback(blogs, err);
        });
    },

    // inserting the blog -->
    insertOneBlog: (databaseInstance, blog, callback) => {
      let insertionResult;
      databaseInstance
        .collection(collectionName)
        .insertOne(blog)
        .then((result) => {
          insertionResult = result;
          callback(result);
        })
        .catch((err) => {
          callback(insertionResult, err);
        });
    },

    // finding the blog -->
    findBlog: (databaseInstance, id, callback) => {
      if (ObjectId.isValid(id)) {
        databaseInstance
          .collection(collectionName)
          .findOne({ _id: new ObjectId(id) })
          .then((doc) => {
            if (doc != null) {
              callback({ blog: doc, statusCode: 200 });
            } else {
              callback({ blog: doc, statusCode: 404 });
            }
          })
          .catch((err) => {
            callback({ blog: undefined, statusCode: 500, error: err });
          });
      } else {
        callback({
          blog: undefined,
          statusCode: 500,
          error: "The requested blog does not exist",
        });
      }
    },

    //deleting the blog -->
    deleteBlog: (databaseInstance, id, callback) => {
      if (ObjectId.isValid(id)) {
        databaseInstance
          .collection(collectionName)
          .deleteOne({ _id: new ObjectId(id) })
          .then((result) => {
            if (result.acknowledged) {
              callback({ statusCode: 200 });
            } else {
              callback({
                statusCode: 500,
                error: "Oops! Please try again later :(",
              });
            }
          })
          .catch((err) => {
            console.log("Error: " + err);
            callback({ statusCode: 500, error: err });
          });
      } else {
        callback({
          statusCode: 404,
          error: "The blog does not exist",
        });
      }
    },

    updateBlog: (databaseInstance, id, update, callback) => {
      if (ObjectId.isValid(id)) {
        databaseInstance
          .collection(collectionName)
          .updateOne({ _id: new ObjectId(id) }, { $set: update })
          .then((result) => {
            if (result.acknowledged) {
              callback({ statusCode: 200 });
            } else {
              callback({
                statusCode: 500,
                error: "Oops! Please try again later :(",
              });
            }
          })
          .catch((err) => {
            console.log("Error: " + err);
            callback({ statusCode: 500, error: err });
          });
      } else {
        callback({
          statusCode: 404,
          error: "The blog does not exist",
        });
      }
    },
  },
};
