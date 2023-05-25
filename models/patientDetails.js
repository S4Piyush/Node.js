const mongoose = require("mongoose")

const patientDetails = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },

    contactNo: {
        type: Number,
        require: true
    },

    Password: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model("patientDetails", patientDetails)