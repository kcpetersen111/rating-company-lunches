
const dotenv = require('dotenv');

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;



module.exports = {
    userName,
    password,
}