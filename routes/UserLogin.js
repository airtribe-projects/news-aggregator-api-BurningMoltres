// news-aggregator-api-BurningMoltres/routes/UserLogin.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt=require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const { username, password, email , preferences } = req.body;
  if (
    typeof username !== "string" ||
    username.length === 0 ||
    typeof password !== "string" ||
    password.length === 0 ||
    typeof email !== "string" ||
    username.length === 0 
    
  ) {
    return res.status(400).json("Incorrect datatypes are passed");
  }

  try {
    const userCredentials = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, userCredentials.password);
   
if(!isPasswordValid)
{
    return res.status(400).json({message:'Invalid email or password'});
}
else
{
    //generating the token
    const token=jwt.sign({
        email:userCredentials.email},
        process.env.JWT_SECRET
    );
    res.send({token})
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
