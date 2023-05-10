const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true
    // },

    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },

})


module.exports = mongoose.model("Admindata", adminSchema)




