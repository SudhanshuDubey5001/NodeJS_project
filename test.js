const i = "sudhanshu";
console.log(i);

//if you want something from another file -> use modules.export = {var1,var2}
// then just -
const props = require('./module')
console.log(props.people);

//or destructure it and only take those values you want
const { people } = require('./module')
console.log(people)

// you can get info about OS = 
const os = require('os')
// console.log(os);
console.log(os.platform(), os.homedir());
