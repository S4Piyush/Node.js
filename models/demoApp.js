const mongoose = require("mongoose")
const demoAppSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("demoApp", demoAppSchema)