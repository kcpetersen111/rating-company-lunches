const express = require('express');
const app = express();

//will need a way to get companies from the db and send it to the front end
app.get("/getReview",(res,req)=>{

});

//will need a way to post a review of the lunch
app.post("/postReview",(res,req)=>{

});

//will need a way to delete reviews
app.delete("/deleteReview",(res,req)=>{

});

//will need a way to edit the review
app.put("/editReview",(res, req)=>{

});

//will need a way to get all reviews
app.get("/getReviews", (res, req)={
    
});

module.exports = {
    app
}