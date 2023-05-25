const patientDetails = require('../models/patientDetails')

module.exports.addSinUp = {
    controller: async (req, res) => {
        try {
            const data = await patientDetails.find({ $or: [{ email: req.body.email }, { userName: req.body.userName }, { contactNo: req.body.contactNo }] })
            if (data.length === 0) {
                new patientDetails(req.body).save()
                return res.send("SinUp Successfully!")
            } else {
                return res.send('Email Already Stored')
            }
        } catch (error) {
            console.log('error', error)
        }

    }
}