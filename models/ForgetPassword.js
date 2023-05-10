const mongoose = require("mongoose")
const otpStore = new mongoose.Schema({

    email: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    }

})

module.exports = mongoose.model("otpStore", otpStore)