// setTimeout is a function that is global object -> global.setTimeout but it is available
// globally so no need to write it
// setTimeout(() => {
//   console.log("Stopping");
//   clearInterval(int); // this will stop the setinterval code after 3 seconds
// }, 3000);

// // this will run code every second
// const int = setInterval(() => {
//   console.log("in the interval");
// }, 1000);

//to get the file and dir name -
console.log(__dirname);
console.log(__filename);
