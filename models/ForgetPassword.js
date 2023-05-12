const mongoose = require("mongoose")
const otpStore = new mongoose.Schema({

    email: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    createdate: {
        type: Date,
        require: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("otpStore", otpStore)