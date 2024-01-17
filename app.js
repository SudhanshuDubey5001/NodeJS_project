// first go through server.js to understand the basics and then come here
const express = require("express");
// a logger
const morgan = require("morgan");

const app = express();
const port = 3000;

//view engines - inserting dynamic content into html. We are using ejs
//first set it up using application setting or app.set
app.set("view engine", "ejs");
// if your html is not in views folder (default) then set it up by -
// app.set('views','myviews')

// to include static files - "public" directory will be exposed
app.use(express.static("public"));

const blogs = [
  {
    title: "First Blog",
    snippet: "This is the snippet for the first blog.",
  },
  {
    title: "Second Blog",
    snippet: "This is the snippet for the second blog.",
  },
  {
    title: "Third Blog",
    snippet: "This is the snippet for the third blog.",
  },
];

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
  res.render("index", { title: "Home", blogs: blogs });
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

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 error page - app.use() - middleware
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
