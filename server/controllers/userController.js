const Sequelize = require('sequelize');
const User = require('../models').user;
const { validateUser } = require('../utils/validate');
const { setPassword } = require('../utils/password');
const { generateId } = require('../utils/generateIds');
const gravatar = require('gravatar');


module.exports.create = async(req, res) => {
    try {
        const { nom, passwd, repasswd, email } = req.body;

        let validation = validateUser(nom, passwd, repasswd, email);

        if (validation == true) {
            let c_user = await User.create({
                id: generateId(),
                nom: nom,
                passwd: setPassword(passwd),
                email: email,
                foto: gravatar.url(this.email, { protocol: 'https' }),
                estado: 0
            });

            res.json(c_user);
        } else {
            // console.log("error validation");
            res.json(validation);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

module.exports.find = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}