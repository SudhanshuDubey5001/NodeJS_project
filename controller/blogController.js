const { getDb } = require("../db/dbConnection");
const { dbOperations } = require("../db/dbOperations");
const { getBlogObject } = require("../models/Blog");

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create" });
};

const blog_create_post = (req, res) => {
  const blog = getBlogObject(req.body);
  if (blog.title && blog.snippet && blog.body) {
    dbOperations.insertOneBlog(getDb(), blog, (result, error) => {
      if (error) {
        res.status(500).render(errorPage, { title: "Error", error });
      } else {
        res.status(302).redirect("/");
      }
      console.log(result);
    });
  } else {
    res.status(404).render(errorPage, {
      title: "Error",
      error: "Check your internet connection",
    });
  }
};

const blog_get = (req, res) => {
  dbOperations.findBlog(
    getDb(),
    req.params.id,
    ({ blog, statusCode, error }) => {
      if (!error && statusCode == 200) {
        res.status(200).render("blogs/blog", { title: "Blog", blog });
      } else {
        if (statusCode == 404) {
          res.status(404).render(errorPage, { title: "404", error: error });
        } else {
          res.status(500).render(errorPage, { title: "Error", error: error });
        }
      }
    }
  );
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  dbOperations.deleteBlog(getDb(), id, ({ statusCode, error }) => {
    if (!error && statusCode == 200) {
      //we will return a json object which we will be received where delete request is made
      res.json({ redirect: "/" });
    } else {
      if (statusCode == 404) {
        res.status(404).render(errorPage, {
          title: "404",
          error: error,
        });
      } else {
        res.status(500).render(errorPage, {
          title: "500",
          error: error,
        });
      }
    }
  });
};

const blog_update = (req, res) => {
  const update = req.body;
  const id = req.params.id;
  dbOperations.updateBlog(getDb(), id, update, ({ statusCode, error }) => {
    if (!error && statusCode == 200) {
      //we will return a json object which we will be received where delete request is made
      res.json({ redirect: "/" });
    } else {
      if (statusCode == 404) {
        res.status(404).render(errorPage, {
          title: "404",
          error: error,
        });
      } else {
        res.status(500).render(errorPage, {
          title: "500",
          error: error,
        });
      }
    }
  });
};

module.exports = {
  blog_create_post,
  blog_create_get,
  blog_get,
  blog_delete,
  blog_update,
};
