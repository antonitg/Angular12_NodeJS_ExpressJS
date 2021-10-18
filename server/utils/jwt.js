const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config/variables.env' });

module.exports.sign = (id) => {
    const JWT_SECRET = process.env.SECRET_JWT;

    var expiration = new Date();

    return jwt.sign({
        id: id,
        exp: parseInt((expiration.getTime() + (60 * 60 * 1000)) / 1000)
    }, JWT_SECRET)

}

module.exports.decode = (token) => {
    const JWT_SECRET = process.env.SECRET_JWT;
    return jwt.verify(token, JWT_SECRET)
}