const app = require('./server');

const db = require('./persist/mongodb');




db.configureHandlers(()=>{
    app.listen(8080, ()=>{
        console.log("server is running on port 8080");
    });
});