// const { response } = require("../server");

const url="http://localhost:8080";

var app = new Vue({
    el:'#app',  
    data: {
      test:"success",
      companies:[],  
      reviews: [],
      currentlyEditing: -1,
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