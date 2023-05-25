const express = require('express')
const routes = express.Router()
const { address, getBy_id } = require('../Controller/Address')

routes.post('/address_details', address.controller)
routes.post('/getBy_id', getBy_id.controller)


module.exports = routes;