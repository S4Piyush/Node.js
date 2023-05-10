const express = require('express')
const routes = express.Router()
const { addSinUp, addLogin, forgetPassword, otp_verification } = require('../Controller/Admin')
const { addSinUpValidation, addLoginValidation } = require('../validations/AdminValidations')

routes.post('/user_signUp', addSinUpValidation, addSinUp.controller)
routes.post('/user_login', addLoginValidation, addLogin.controller)
routes.post('/user_ForgetPassword', forgetPassword.controller)
routes.post('/otp_verification', otp_verification.controller)


module.exports = routes;


