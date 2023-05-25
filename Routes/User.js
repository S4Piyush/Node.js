const express = require('express')
const router = express.Router()
const Schemadata = require('../models/Admindata')


router.post('/get_User', (req, res) => {
    try {
        const user = new Schemadata()
        user.name = req.body.name,
            user.lastName = req.body.lastname,
            user.contactNo = req.body.contactNo,
            user.save()
        if (user) {
            return res.status(200).send("user data syccessfully!!!🌟");
        } else {
            return res.status(400).send("bad_reouest")
        }
    } catch (error) {
        console.log('error🎈', error)
        return res.status(500).send("Somethig went wrong")
    }
})


router.get('/get_admin_user', async (req, res) => {
    const temp = await Schemadata.find().exec()
    res.send(temp)
})

router.delete('/admin_delete/:id', async (req, res) => {
    await Schemadata.findByIdAndDelete(req.params.id).exec()
    res.send("User deleted successfully")
})

router.put('/admin_edit/:id', async (req, res) => {
    const temp = await Schemadata.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
    res.send(temp)
})

module.exports = router
