const mongoose = require("mongoose")

const Addressdetails = new mongoose.Schema({
    AddressType: { type: String, require: true },
    currentAddress: { type: String, require: true },
    billingAddress: { type: String, require: true },
    WorkAddress: { type: String, require: true },
})

const Address = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "demoApp",
        require: true
    },
    email: { type: String, require: true },
    Address: [Addressdetails]
})
module.exports = mongoose.model("Adressdetails", Address)