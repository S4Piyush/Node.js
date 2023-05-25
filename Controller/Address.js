const AddressSchema = require('../models/Address')
const demoSchema = require('../models/demoApp')

module.exports.address = {
    controller: async (req, res) => {
        try {
            const email = await AddressSchema.find({ email: req.body.email })
            if (email && email.length) {
                return res.status(400).send("user already exists")
            } else {
                const temp = new AddressSchema()
                temp.email = req.body.email
                temp.Address = req.body.Address
                temp.save()
                if (temp) {
                    return res.send(temp)
                } else {
                    return res.status(400).send("bad getway")
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

module.exports.getBy_id = {
    controller: async (req, res) => {
        demoSchema.findOne({ _id: req.body._id })
            .then((ele) => {
                AddressSchema.findOne({ email: ele.email }).populate("userName", "userName")
                    .then((item) => {
                        const temp = {
                            _id: ele._id,
                            isDelete: ele.isDelete,
                            // email: ele.email,
                            userName: ele.userName,
                            password: ele.password,
                            Address: item ? item.Address : [],
                            AddressUserName: item ? item.userName.userName : [],
                            AddressUser: item ? item.userName : [],
                        }
                        return res.send(temp)
                    }).catch((error) => {
                        console.log('error', error)
                        return res.send("somting wrong AddressSchema")
                    })
            }).catch((error) => {
                console.log('error', error)
                return res.send("somting wrong demoSchema")
            })
    }
}