const jwt = require("jsonwebtoken")
const jwtKey = "0a6b944d-d2fb-46fc-a85e-4030c986cd9f"

function jwttokon(data) {
    const tok = jwt.sign({ data }, jwtKey)
    return tok
}
module.exports = { jwttokon }