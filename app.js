// news-aggregator-api-BurningMoltres/app.js
const express = require('express');
const mongoose=require('mongoose');
const app = express();
const port = 3000;
const UserRegistration=require('./routes/UserRegistration');
const UserLogin=require('./routes/UserLogin');
const UserPreferences=require('./routes/UserPreferences');
const FetchingNews=require('./routes/FetchingNews');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URL).then(()=>{
    
    app.listen(port, (err) => {
        if (err) {
            return err;
        }
        
    });
})

app.use('/registerUser',UserRegistration);
app.use('/userLogin',UserLogin);
app.use('/preferences',UserPreferences);
app.use('/news',FetchingNews);

module.exports = app;