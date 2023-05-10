const express = require('express');
const app = express();
require("./utils/Config");
const userRoutes = require('./Routes/User')
const adminRoutes = require('./Routes/Admin')


const cors = require('cors')

app.use(express.json());

const corsOption = {
    origin: "*",
};
app.use(cors(corsOption))


app.use('/api/admin_Login', adminRoutes)
app.use('/api/user_server', userRoutes)


app.listen(7000, () => {
    console.log('StartSever🌟')
})