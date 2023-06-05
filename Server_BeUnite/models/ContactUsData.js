const mongoose = require('mongoose');

const ContactUsSchema = mongoose.Schema({
    orgtype:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    messageDate: {
        type: Date,
        default: Date.now,
    },
});

const ContactUsData = mongoose.model("ConactUsData", ContactUsSchema );

module.exports = ContactUsData;

