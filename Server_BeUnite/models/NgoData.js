const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const NgoSchema = new mongoose.Schema({
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
        default: ''
      },
})

NgoSchema.pre('save', async function(next){
    const ngodata = this;
    console.log("Just before saving",ngodata.password);
    if(!ngodata.isModified('password')){
        return next();
    }
    ngodata.password = await bcrypt.hash(ngodata.password,8);
    console.log("Just before saving & after hashing",ngodata);
    next();
})

mongoose.model("NgoData",NgoSchema)