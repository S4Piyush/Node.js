const express = require('express');
const app = express();
require("./utils/Config");
const userRoutes = require('./Routes/User')
const adminRoutes = require('./Routes/Admin')
const address = require('./Routes/Address')
const patients = require('./Routes/Patients')

app.use(express.json());

const cors = require('cors')
const corsOption = {
    origin: "*",
};
app.use(cors(corsOption))

app.use('/api/admin_Login', adminRoutes)
app.use('/api/user_server', userRoutes)
app.use('/api/address_data', address)
app.use('/patients', patients)


app.listen(4000, () => {
    console.log('StartServer🌟')
})