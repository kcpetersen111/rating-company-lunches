// need to find what plugin keeps adding this code
// const { response } = require("../server");

// const { response } = require("../server");

const url="http://localhost:8080";

var app = new Vue({
    el:'#app',  
    data: {
      // test:"success",
      companies:[],  
      reviews: [],
      currentlyEditing: -1,
      tempRating:"",
      tempCompany:"",
      tempReview:"",
      currentlyAdding:false,
      addingCompany:"",
      addingRating:"",
      addingReview:"",
    },
    methods:{
      updateButtonClick: function(index){
        this.currentlyEditing = index;
        
        this.currentlyAdding=false;
        this.addingRating = "";
        this.addingReview= "";
        this.addingCompany = "";

        // console.log("update button press"+index);
      },
      deleteButtonClick: function(review){
        // console.log("delete button press");
        // console.log(review);
        const id = review._id;

        fetch(url+"/deleteReview/"+id, {
          method: "DELETE"
        }).then(response=>{
          response.json().then(deleted=>{
            console.log(deleted);
            //probably refresh the list of reviews  
            this.refreshReviews()
          })
        })

      },
      addReview: function(){
        this.currentlyAdding = true;
        this.currentlyEditing = -1;
        this.tempRating = "";
        this.tempReview = "";
        this.tempCompany = "";
      },
      attemptToPostToServer(){
        if(this.addingCompany == "" || this.addingRating=="" || this.addingReview=="" ||this.addingRating>10 ||this.addingRating<1 ||!this.companies.includes(this.addingCompany)){
          return;
        }
        this.submitAddReview();
      },
      submitAddReview: function(){
        //fill in the review
        let review = {
          name: "",
          companyName: this.addingCompany,
          review: this.addingReview,
          rating: this.addingRating
        };
        fetch(url+"/postReview",{
          method:"POST",
          body: JSON.stringify(review),
          headers:{
            "Content-Type": "application/json"
          }
        }).then(response=>{
          response.json().then(data=>{
            // console.log(data)
            this.refreshReviews();
          });
        });

        this.addingCompany = "";
        this.addingReview = "";
        this.addingRating = "";
        this.currentlyAdding = false;

      },

      submitButton: function(review){
        // console.log("submit button click");

        if(!this.companies.includes(this.tempCompany)){
          return;
        }

        if(this.tempReview != ""){
          review.review = this.tempReview;
        }
        if(this.tempRating != ""){
          review.rating = this.tempRating;
        }
        if(this.tempCompany != ""){
          review.companyName = this.tempCompany;
        }

        fetch(url+"/editReview/"+review._id, {
          method: "PUT",
          body: JSON.stringify(review),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response =>{
          response.json().then(data=>{
            // console.log(data)
            this.refreshReviews;
          });
        });

        
        this.currentlyEditing = -1;
        this.tempRating = "";
        this.tempReview = "";
        this.tempCompany = "";
      },

      cancelButton: function(index){
        // console.log("cancel button click");

        this.currentlyEditing = -1;
        this.tempRating = "";
        this.tempReview = "";
        this.tempCompany = "";

      },
      refreshReviews: function(){
        fetch(url+"/getReviews").then(response =>{
          response.json().then(allReviews=>{
            this.reviews = allReviews;
            // console.log(allReviews);
          });
        });
      }

    },

    created: function() {

      this.refreshReviews();

      fetch(url+"/getReview").then(response => {
        response.json().then(companies=>{
          this.companies = companies;
          // console.log(companies);
        });
      });

      

    },
});