const app = require('./server');

const db = require('./persist/mongo');

const config = require('./config');


db.configureHandlers(()=>{
    app.listen(8080, ()=>{
        console.log("server is running on port 8080");
    });
});

db.connect(config.password);