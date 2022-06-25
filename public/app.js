// const { response } = require("../server");

const url="http://localhost:8080";

var app = new Vue({
    el:'#app',  
    data: {
      test:"success",
      companies:[],  
      reviews: [],
      currentlyEditing: -1,
      tempRating:0,
      tempCompany:"",
      tempReview:"",
    },
    methods:{
      updateButtonClick: function(index){
        this.currentlyEditing = index;
        console.log("update button press"+index);
      },
      deleteButtonClick: function(index){
        console.log("delete button press"+index);
      },
      addReview: function(){
        console.log("create a new review");
      },
      submitButton: function(review){
        console.log("submit button click");
        review.review = this.tempReview;
        review.rating = this.tempRating;
        review.companyName = this.tempCompany;
        currentlyEditing = -1;
      },
      cancelButton: function(index){
        console.log("cancel button click");
      },
    },

    created: function() {

      fetch(url+"/getReviews").then(response =>{
        response.json().then(allReviews=>{
          this.reviews = allReviews;
          console.log(allReviews);
        });
      });

      fetch(url+"/getReview").then(response => {
        response.json().then(companies=>{
          this.companies = companies;
          console.log(companies);
        });
      });

      

    },
});