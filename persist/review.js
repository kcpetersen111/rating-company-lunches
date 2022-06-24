const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name: {type: String, default:""}, // min: 1},
    companyName: {type: String, default:""},
    review: { type: String, default:""},
    rating: { type: Number, default:1, min:[1, "Can't give less than one star."], max:10},
});

const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;