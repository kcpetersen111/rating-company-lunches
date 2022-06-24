const mongoose = require("mongoose");

const db = mongoose.connection;

function configureHandlers(callback){
    // set up the once db methods
    db.once("connecting",()=>{
        console.log("Connecting to mongodb");
    });

    db.once("connected",()=>{
        console.log("Connected to mongodb");
    });

    //also start listening
    db.once("open",()=>{
        console.log("Connection is now open");
        callback();
    });

    db.once("error",()=>{
        console.log("An error occurred while connecting to mongodb")
    });
     
}

function connect(password){
    //acctually connect to the db

    password = encodeURI(password);
    const connectionString = `mongodb+srv://kcpetersen:${password}@cluster0.crhdmiu.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

}

module.exports = {
    configureHandlers,
    connect,
}