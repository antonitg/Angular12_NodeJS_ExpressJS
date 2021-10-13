var crypto = require('crypto');
const hmacSHA512 = require('crypto-js/hmac-sha512');
require('dotenv').config({ path: 'config/variables.env' });

module.exports.setPassword = function(passwd) {
    let salt = crypto.randomBytes(16).toString('hex');
    passwd = hmacSHA512(passwd, process.env.SECRET_PASSWD).toString();;
    let hash = crypto.pbkdf2Sync(passwd, salt, 10000, 512, 'sha512').toString('hex');

    return hash;
};