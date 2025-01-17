// news-aggregator-api-BurningMoltres/routes/UserPreferences.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//verify jwt token
//middleware function to verify jwt
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decodedToken;
    return next();
  }
  next();
};

router.use(verifyJWT);

//get/preferences
router.get("/", async (req, res, next) => {
  try {
    let email = req.email.email;
    const userId = await User.findOne({ email });
    if (userId.preferences.length <= 0) {
      return res.status(404).json("Preferences data not available");
    }

    res.status(400).json(userId.preferences);
  } catch (error) {
    res.status(404).json("User not Found");

  }
});

//put/preferences
router.put("/", async(req, res, next) => {
    try {
        let email = req.email.email;
        let updatedPreferences=req.body.preferences;
        const userId = await User.findOne({ email });
        if (userId.preferences.length <= 0 || updatedPreferences.length < 0 ) {
          return res.status(404).json("Operation could not be performed");
        }
         await User.findOneAndUpdate({email:email},{preferences:updatedPreferences},{new:true}) 
        res.status(400).json("New Preferences Updated");
      } catch (error) {
        res.status(404).json("User not Found");
      }
});

module.exports = router;
