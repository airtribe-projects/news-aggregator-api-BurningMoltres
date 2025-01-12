// news-aggregator-api-BurningMoltres/models/user.js
const mongoose=require('mongoose');
const courseSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255,
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255
    },
    email:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255
    },
    preferences:{
        type:[],
        required:true,
        minLength:2,
        maxLength:255
    }
})

const User=mongoose.model("User",courseSchema);
module.exports=User;