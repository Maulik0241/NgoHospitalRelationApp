const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(
    ()=>{
        console.log('connected successfully!');
    })
.catch((err)=>{
    console.log("could not connect to db!"+ err);
})