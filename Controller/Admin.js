
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
                    userSinupData.save()
                if (userSinupData) {
                    const token = jwttokon(userSinupData);
                    res.send({ userSinupData, tokon: token })
                } else {
                    return res.status(400).send("bad getway")
                }
            }
        } catch (error) {
            console.log('error🎄', error)
            return res.status(500).send("somting wrong")
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
                    userName: user.userName,
                    email: user.email,
                    password: user.password,
                }
                return res.status(200).send({ userold, token: token, Some: "Login Successfully!" })
            }
            return res.status(400).send("Wrong Password!")

        } else {
            return res.status(400).send('User doesnt exits!');
        }
    }
}

module.exports.forgetPassword = {
    controller: async (req, res) => {
        const verifyemail = req.body.email.toLowerCase()
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
                    pass: "hezdfqtmupctzydx"
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
            otp.save()
            delete mailOptions.html
            return res.status(200).send(mailOptions)

        } else {
            return res.status(500).send("User doesnt exits!")
        }
    }
}

module.exports.otp_verification = {
    controller: async (req, res) => {
        const verification = await otpStore.findOne({ email: req.body.email, otp: req.body.otp })
        if (verification) {
            return res.status(200).send("otp Verification")
        } else {
            return res.status(400).send("invalidOTP")
        }
    }
}

module.exports.reset_password = {
    controller: async (req, res) => {
        const temp = await otpStore.findOne({ email: req.body.email, otp: req.body.otp })
        if (temp) {
            const updateData = await demoSchema.findOneAndUpdate({ email: req.body.email }, { password: req.body.paswword }, { new: true })
            res.send(updateData)
        }
    }
}