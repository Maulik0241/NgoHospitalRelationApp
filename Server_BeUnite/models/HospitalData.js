const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const HospitalSchema = new mongoose.Schema({
    orgname:{
        type: String,
        required: true
    },
    contactname:{
        type: String,
        required: true
    },
    contactemail:{
        type: String,
        unique: true
    },
    contactphone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    profileimage: {
        type: Object,
        default:null,
        required: false,
      },
      description: {
        type: String,
        default: '',
      },
})

HospitalSchema.pre('save', async function(next){
    const hospitaldata = this;
    console.log("Just before saving",hospitaldata.password);
    if(!hospitaldata.isModified('password')){
        return next();
    }
    hospitaldata.password = await bcrypt.hash(hospitaldata.password,8);
    console.log("Just before saving & after hashing",hospitaldata);
    next();
})

mongoose.model("HospitalData",HospitalSchema)