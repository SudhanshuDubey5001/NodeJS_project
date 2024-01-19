// first go through server.js to understand the basics and then come here
const express = require("express");
// a logger
const morgan = require("morgan");
// mongo db
let db;
const { connectToDb, getDb } = require("./db/dbConnection");
const { getBlogObject } = require("./models/Blog");
const { dbOperations } = require("./db/dbOperations");
const router = require("./routes/blogRoutes");

//constants
const collectionName = "Blogs";
const errorPage = "error";

const app = express();
const port = 3000;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(port, () => console.log(`App is listening on port ${port}!`));
  } else {
    console.log("Error connecting with database");
  }
});

//view engines - inserting dynamic content into html. We are using ejs
//first set it up using application setting or app.set
app.set("view engine", "ejs");
// if your html is not in views folder (default) then set it up by -
// app.set('views','myviews')

// to include static files - "public" directory will be exposed
app.use(express.static("public"));

//for mongodb to send post request
app.use(express.json());

//to get the body paramater from the request object -
app.use(express.urlencoded({ extended: true }));

// mock blogs
// const blogs = [
//   {
//     title: "First Blog",
//     snippet: "This is the snippet for the first blog.",
//   },
//   {
//     title: "Second Blog",
//     snippet: "This is the snippet for the second blog.",
//   },
//   {
//     title: "Third Blog",
//     snippet: "This is the snippet for the third blog.",
//   },
// ];

//middleware for details -
app.use((req, res, next) => {
  console.log("Request is made");
  console.log("Host name - " + req.hostname);
  console.log("Host name - " + req.path);
  console.log("Host name - " + req.method);
  next(); // to move on
});

// you can do all of those things with logger middleware like morgan
app.use(morgan("dev"));

app.get("/", (req, res) => {
  //res.send automatically sets up content-type and status codes
  //   res.send('Home page');

  //without view engine
  // 1st arg = relative path    2nd arg = where is this relative to?
  //   res.sendFile("./views/index.html", { root: __dirname });

  // with view engine
  // you can also pass values as a 2nd args
  //   res.render("index", { title: "Home", blogs: blogs });

  // plain old way -
  //   let blogs = [];
  //   db.collection(collectionName)
  //     .find()
  //     .sort({ createdAt: -1 })
  //     .forEach((blog) => {
  //       blogs.push(blog);
  //     })
  //     .then(() => {
  //       res.status(200).render("index", { title: "Home", blogs: blogs });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // abstracted the db operations in this way -
  dbOperations.getAllBlogs(db, (blogs, error) => {
    if (!error) {
      res.status(200).render("index", { title: "Home", blogs: blogs });
    } else {
      res.status(500).render(errorPage, {
        title: "Error",
        error: "Oops! Couldn't fetch the blogs",
      });
    }
  });
});

app.get("/about", (req, res) => {
  //without view engine
  // res.sendFile("./views/about.html", { root: __dirname });
  //with view engine
  res.render("about", { title: "About" });
});

// to redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// for some common routes like blogs/ with CRUD operations, rather than creating
// app.get app.delete app.put, app.post -> and make this file more complicated, we used
// separate file for CRUD operation for blog and make a mini app router using express.Router()
// to make those routes separate and this middelware helps us to use those routes -
//also since all the routes starts with /blogs, we can define it as first argument
app.use("/blogs", router);

// error page - app.use() - middleware - make sure to keep this in last as it runs every time
app.use((req, res) => {
  res.status(404).render(errorPage, {
    title: "Error",
    error: "Oops! The page requested does not exist",
  });
});
