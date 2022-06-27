
const dotenv = require('dotenv');

const fs = require('fs');

 function readFile(){
    return fs.readFileSync('var.env', 'utf-8')
}

const userName = process.env.MONGO_USERNAME;
const password = readFile();
// console.log(password);



module.exports = {
    userName,
    password,
}