const express = require('express')
const routes = express.Router()
const { addSinUp, addLogin, forgetPassword, otp_verification, reset_password, delete_user } = require('../Controller/Admin')
const { addSinUpValidation, addLoginValidation } = require('../validations/AdminValidations')

routes.post('/user_signUp', addSinUpValidation, addSinUp.controller)
routes.post('/user_login', addLoginValidation, addLogin.controller)
routes.post('/user_ForgetPassword', forgetPassword.controller)
routes.post('/otp_verification', otp_verification.controller)
routes.post('/reset_password', reset_password.controller)
routes.delete('/delete_user', delete_user.controller)





module.exports = routes;


