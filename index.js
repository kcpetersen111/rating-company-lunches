const app = require('./server');

const db = require('./persist/mongo');

const config = require('./config');


db.configureHandlers(()=>{
    app.listen(config.port, ()=>{
        console.log("server is running on port "+ config.port);
    });
});

db.connect(config.password);