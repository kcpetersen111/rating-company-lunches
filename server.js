const express = require('express');
const Review = require('./persist/review');
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json())

app.use(express.static(`${__dirname}/public`));

//will need a way to get companies from the db and send it to the front end
app.get("/getReview",(req,res)=>{
    res.json(["Parks Pass","tcn","Stephen Wade","Zonos","SciTools","Vasion","SkyWest"]);

});

//will need a way to post a review of the lunch
app.post("/postReview",(req,res)=>{

    Review.create(req.body).then((review)=>{
        // console.log(req.body);
        // console.log(review);
        res.json(review);
    }).catch((err) =>{
        res.status(500).json(err);
    });
});

//will need a way to delete reviews
app.delete("/deleteReview/:id",(req,res)=>{
    const id = req.params.id

    Review.findByIdAndDelete(id).then(review=>{
        if(review == null){
            res.status(404).json({message:"Not found"});
            return;
        }
        res.json(review);
    }).catch(err =>{
        res.status(500).json(err);
    });
});

//will need a way to edit the review
app.put("/editReview/:id",(req,res)=>{
    const id = req.params.id;

    Review.findByIdAndUpdate(id, req.body,{returnDocument:'after'}).then(review=>{
        // console.log(review);
        if(review == null){
            res.status(404).json({message:"not found"});
            return;
        }
        res.json(review);
    }).catch(err=>{
        res.status(500).json(err);
    });
});

//will need a way to get all reviews
app.get("/getReviews", (req,res)=>{
    Review.find().then(reviews =>{
        res.json(reviews);
    }).catch(err=>{
        res.status(500).json(err);
    })
});

module.exports = app;