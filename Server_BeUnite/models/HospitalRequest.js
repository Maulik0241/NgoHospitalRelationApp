const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    requestDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    reasonForRejection: {
        type: String,
        default: '',
    },
    helpFor: {
        type: String,
        enum: ['Patient', 'Medical'],
        required: true,
    },
    patientName: {
        type: String,
        required: function () {
            return this.helpFor === 'Patient';
        },
    },
    contactNumber: {
        type: String,
        required: function(){
            return this.helpFor === 'Patient';
        },
    },
    address: {
        type: String,
        required: function(){
            return this.helpFor === 'Patient';
        },
    },
    problemDescription: {
        type: String,
        required: true,
    },
});

const HospitalRequest = mongoose.model("HospitalRequest", RequestSchema);

module.exports = HospitalRequest;
