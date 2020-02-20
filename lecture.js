const fs = require('fs');
const name = "e_also_big";

const content = fs.readFileSync(`./exemples/${name}.in`, {encoding: "utf8"});
const [ligne1, pizzas] = content.split("\n");






const dataToWrite = "";

fs.writeFileSync(`./exemples/${name}.out`, dataToWrite, {encoding: "utf8"});



