const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/admin').then(() => {
    console.log("Connection established")
}).catch((err) => {
    console.log('err', err)
})