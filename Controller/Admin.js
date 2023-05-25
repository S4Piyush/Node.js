
const demoSchema = require('../models/demoApp')
const otpStore = require('../models/ForgetPassword')
const { jwttokon } = require('../utils/jwt.helper')
const nodemailer = require('nodemailer')


module.exports.addSinUp = {
    controller: async (req, res) => {

        try {
            const alreadyExist = await demoSchema.find({ email: req.body.email })
            if (alreadyExist && alreadyExist.length) {
                return res.status(400).send("user already exists")
            } else {
                const userSinupData = new demoSchema()
                userSinupData.email = req.body.email.toLowerCase(),
                    userSinupData.userName = req.body.userName,
                    userSinupData.password = req.body.password,
                    userSinupData.additionalInfo = req.body.additionalInfo
                userSinupData.save()
                if (userSinupData) {
                    const token = jwttokon(userSinupData);
                    res.send({ userSinupData, tokon: token })
                } else {
                    return res.status(400).send("bad getway")
                }
            }
        } catch (error) {
            console.log('error', error)
            return res.status(500).send("somting wr ong")
        }

    }
}

module.exports.addLogin = {
    controller: async (req, res) => {
        const newEmail = req.body.email.toLowerCase()
        const user = await demoSchema.findOne({ email: newEmail, })
        if (user) {
            if (req.body.password === user.password) {
                const token = jwttokon(user);
                const userold = {
                    email: user.email,
                    password: user.password,
                }
                return res.status(200).send({ userold, token: token, message: "Login Successfully!" })
            }
            return res.status(400).send("Wrong Password!")

        } else {
            return res.status(400).send('User doesnt exits!');
        }
    }
}

module.exports.forgetPassword = {
    controller: async (req, res) => {
        const verifyemail = req.body.email
        const email = await demoSchema.findOne({ email: verifyemail })
        if (email) {
            const otpCode = Math.floor((Math.random() * 10000) + 1);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: "piyushramani.7seasol@gmail.com",
                    pass: "yqfjbeqxaroibuid"
                }
            })
            const mailOptions = {
                from: "piyushramani.7seasol@gmail.com",
                to: email.email,
                subject: "Forgot password",
                html: `Reset Password OTP : ${otpCode}`,

            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error", error)
                } else {
                    console.log("info", info)
                }
            })
            const otp = new otpStore()
            otp.email = mailOptions.to,
                otp.otp = otpCode
            otp.createdate = new Date()
            otp.save()
            delete mailOptions.html
            return res.status(200).send(otp)

        } else {
            return res.status(500).send("User doesnt exits!")
        }
    }
}

module.exports.otp_verification = {
    controller: async (req, res) => {
        const verification = await otpStore.findOne({ email: req.body.email, otp: req.body.otp })
        console.log('verification', verification)
        if (verification) {
            if (verification.createdate >= new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 10)))) {
                return res.status(200).send("otp Verification")
            } else {
                return res.send("otp Expire")
            }
        } else {
            return res.status(400).send("invalidOTP")
        }
    }
}

module.exports.reset_password = {
    controller: async (req, res) => {
        const temp = await otpStore.findOne({ email: req.body.email })
        console.log('temp', temp, req.body.email)
        if (temp) {
            const updateData = await demoSchema.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }, { new: true })
            res.send(updateData)
        } else {
            return res.send("invalid Otp or email")
        }
    }
}


module.exports.delete_user = {
    controller: async (req, res) => {
        const deleteUser = await demoSchema.findOneAndUpdate({ _id: req.query.id, isDelete: false }, { isDelete: true }, { new: true })
        if (deleteUser) {
            return res.send(deleteUser)
        } else {
            return res.send("user already delete")
        }
    }
}