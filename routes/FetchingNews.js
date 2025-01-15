// news-aggregator-api-BurningMoltres/routes/FetchingNews.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const redis = require("redis");

require("dotenv").config();

//create redis client to connect to redis server
let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => {
  console.log(error);
  });
  await redisClient.connect();
})();

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

router.get("/", async (req, res, next) => {
  if (req.email.email.length <= 0) {
    res.status(401).json("User is not authorised");
  }
  let email = req.email.email;
  const userId = await User.findOne({ email });
  const preferences = userId.preferences;
  console.log(preferences);

  //check if data is already cached
  const cachedData = await redisClient.get("calculatedData");
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }
  // Make separate Axios requests for each category in preferences
  const promises = preferences.map((category) =>
    axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${process.env.API_KEY}`
    )
  );

  try {
    //Wait for all requests to finish
    const responses = await Promise.all(promises);

    const allArticles = responses.flatMap((response) => response.data.articles);
    await redisClient.set(
      "calculatedData",
      JSON.stringify(allArticles),
      "EX",
      3600
    );
    console.log(allArticles);
    res.status(200).json(allArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error"); // Handle errors gracefully
  }
});

module.exports = router;
