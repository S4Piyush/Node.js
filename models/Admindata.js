const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNo: { type: Number, required: true },
    isDelete: { type: Boolean, default: false }
})
module.exports = mongoose.model("Admindata", adminSchema)




