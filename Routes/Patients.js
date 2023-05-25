const express = require('express')
const routes = express.Router()
const { addSinUp } = require('../Controller/patients')

routes.post('/patients_Sinup', addSinUp.controller)

module.exports = routes;