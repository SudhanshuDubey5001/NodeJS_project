//we can do file CRUD operations with node
const fs = require("fs"); //fs is the core modules for file system

// read file
// fs.readFile("./docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log("Error: " + err);
//   } else {
//     console.log(data.toString());
//   }
// });

//write file - > if the file doesn't exist, it will create for us otherwise it will overwrite
// fs.writeFile("./assets/test.txt", "ello there mate", () => {
//   console.log("File write complete");
// });

//making directories and deleting empty directories
//first check if the directory already exists
// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", (err) => {
//     if (err) console.log(err);
//     console.log("Directory created");
//   });
// } else {
//   //delete the folder instead
//   fs.rmdir("./assets", (err) => {
//     if (err) console.log(err);
//     else console.log("Directory deleted");
//   });
// }

// to delete a file -
// if (fs.existsSync("./assets/test.txt")) {
//   fs.unlink("./assets/test.txt", (err) => {
//     if (err) console.log(err);
//     else console.log("File deleted!!");
//   });
// } else {
//   console.log("File does not exist");
// }

// using streams to read large data -
const readStream = fs.createReadStream("./docs/blog1.txt", {
  encoding: "utf-8",
});

//we can copy the data in chunks to new file
const writeStream = fs.createWriteStream("./docs/blog1Copy_pipe.txt");

// readStream.on("data", (chunk) => {
//   console.log("----------NEW CHUNK----------");
//   //   console.log(chunk.toString()); //we can specify utf8 encoding so that we don't have to use toString()
//   console.log(chunk);

//   //copy the content in a new file
//   writeStream.write("\n--------NEW CHUNK----------\n");
//   writeStream.write(chunk);
// });

// now all that readStream and writeStream code to make a copy of the data can be 
//done using piping.
readStream.pipe(writeStream)
