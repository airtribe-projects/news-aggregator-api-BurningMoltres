// news-aggregator-api-BurningMoltres/app.js
const express = require('express');
const mongoose=require('mongoose');
const app = express();
const port = 3000;
const UserRegistration=require('./routes/UserRegistration');
const UserLogin=require('./routes/UserLogin');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To MongoDb");
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
})

app.use('/registerUser',UserRegistration);
app.use('/userLogin',UserLogin);


module.exports = app;