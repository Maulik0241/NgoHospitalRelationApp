const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.set("view engine","ejs");
app.use(express.urlencoded({ extended:false}))
//
 require('./db');
 require('./models/NgoData');
 require("./models/HospitalData");
// 

const authRoutes =require('./routes/authRoutes');
const requireToken = require('./Middlewares/authTokenRequired');
//
app.use(bodyParser.json());
app.use(authRoutes);
// 

app.get('/',requireToken, (req,res) => {
        res.send('this is home page');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
