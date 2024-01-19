//if you want to separate certain routes like for blog get, post and delete
// you can make a separate file to make the code cleaner

const express = require("express");
const blogController = require("../controller/blogController");

// make a mini app router which we can use anywhere else in our app
const router = express.Router();

const errorPage = "error";

//going to create blog screen
router.get("/create", blogController.blog_create_get);

// adding a blog
router.post("/create", blogController.blog_create_post);

// finding one blog
router.get("/:id", blogController.blog_get);

router.patch("/:id",blogController.blog_update);

// deleting a blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;
