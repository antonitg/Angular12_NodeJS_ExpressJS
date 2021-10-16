const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config/variables.env' });

module.exports.sign = (id) => {
    const JWT_SECRET = process.env.SECRET_JWT;

    var expiration = new Date();
    // console.log(expiration.getTime() + (60 * 60));
    // console.log(expiration.getTime());

    return jwt.sign({
        id: id,
        exp: expiration.getTime() + (60 * 60)
    }, JWT_SECRET)

}

module.exports.decode = (token) => {
    const JWT_SECRET = process.env.SECRET_JWT;
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return err;
        }
        console.log(decoded);
        return decoded;
    })
}