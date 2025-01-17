// news-aggregator-api-BurningMoltres/models/user.js
const mongoose=require('mongoose');
const courseSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minLength:5,
        maxLength:255,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    preferences:{
        type:Array,
        of:String,
        required:true,
        minLength:2,
        maxLength:255
    }
})

const User=mongoose.model("User",courseSchema);
module.exports=User;