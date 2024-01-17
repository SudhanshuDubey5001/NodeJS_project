// making a server from scratch
const http = require("http");
const fs = require("fs");
// initialize a npm init and install lodash library
const _ = require("lodash");

const server = http.createServer((req, res) => {
  console.log("request made");
  console.log(req.url, req.method);
  //to send back response -
  // first set the header -
  //   res.setHeader("Content-Type", "text/html");
  //   //write the response you want to send back -
  //   res.write('<h1>Node JS</h1>');
  //   res.write("<p>Ello there mate</p>");
  //   //mention that you stopped writing
  //   res.end();

  //to use a html file and send that as a response -
  //   fs.readFile("./views/index.html", (err, data) => {
  //     if (err) {
  //       res.write(`<p>Error: ${err}</p>`);
  //       res.end();
  //     } else {
  //     //   res.write(data);
  //     //   res.end();
  //     res.end(data);  //if you are using only one res.write() then just use res.end(data) directly
  //     }
  //   });

  //now if we want to use routes -
  let path = "./views/"; //because all our html files are in views
  switch (req.url) {
    case "/":
      path += "index.html";
      //set the status code too here
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    //if you want to redirect users when there are on specific routes then-
    case "/about-me":
      res.statusCode = 301; //redirect status code - make sure to set this otherwise redirect will not work
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.write(`<p>Error: ${err}</p>`);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  //no need to write localhost as its default
  console.log("listening on port 3000");
});

// using lodash
// random number
const random = _.random(0, 20);
console.log("Random no. - " + random);

// to run functions only once
const greet = _.once(() => {
  console.log("Shu miya");
});

greet()
greet()
greet()