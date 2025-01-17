// news-aggregator-api-BurningMoltres/routes/UserRegistration.js
const express=require('express');
const router=express.Router();
const User=require("../models/user");
const bcrypt=require('bcrypt');
const saltRounds=10;


router.post('/',async (req,res,next)=>{
const {username,password,email,preferences}=req.body;

//check datatype of username and password 
//encrypt and store in database the password
//if correct store in database


if (typeof username !== 'string' || username.length === 0 ||
    typeof password !== 'string' || password.length === 0 || password.length <= 5)  {
  return res.status(400).json("Incorrect datatypes are passed");
}

try {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const newUser = new User({ username, password: hashedPassword,email,preferences });

   await User.create(newUser);
  // Send success response
  res.status(201).json({ message: "User registered successfully" });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Error registering user" });
}
});



module.exports=router;