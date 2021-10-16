var crypto = require('crypto');
const hmacSHA512 = require('crypto-js/hmac-sha512');
require('dotenv').config({ path: 'config/variables.env' });

module.exports.setPassword = function(passwd) {
    let salt = crypto.randomBytes(16).toString('hex');
    passwd = hmacSHA512(passwd, process.env.SECRET_PASSWD).toString();
    let hash = salt + ':' + crypto.pbkdf2Sync(passwd, salt, 10000, 512, 'sha512').toString('hex');

    return hash;
};

module.exports.passwordCheck = function(passwd, hash1) {
    const hash = hash1.split(':');

    passwd = hmacSHA512(passwd, process.env.SECRET_PASSWD).toString();
    var newhash = crypto.pbkdf2Sync(passwd, hash[0], 10000, 512, 'sha512').toString('hex');

    if (hash[1] === newhash) {
        return true;
    }
    return false;

}