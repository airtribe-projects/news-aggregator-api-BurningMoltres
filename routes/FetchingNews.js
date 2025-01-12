// news-aggregator-api-BurningMoltres/routes/FetchingNews.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios=require("axios");
require("dotenv").config();

//middleware function to verify jwt
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decodedToken;
    return next();
  }
  next();
};

router.use(verifyJWT);

router.get("/",async (req,res,next)=>{
    if(req.email.email.length<=0)
    {
        res.status(401).json("User is not authorised");
    }
    let email = req.email.email;
    const userId = await User.findOne({ email });
    const preferences=userId.preferences;
    console.log(preferences);

    // Make separate Axios requests for each category in preferences
  const promises = preferences.map(category =>
    axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${process.env.API_KEY}`)
  );

  try
  {
    //Wait for all requests to finish
    const responses=await Promise.all(promises);

    //combine articles from all responses into single array
    const allArticles=responses.flatMap(response => response.data.articles);
    console.log(allArticles);
    res.status(200).json(allArticles);

  }
  catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error"); // Handle errors gracefully
  }

})

module.exports=router;