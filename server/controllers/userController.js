const User = require('../models').user;
const { validateUser } = require('../utils/validate');
const { setPassword, passwordCheck } = require('../utils/password');
const { generateId } = require('../utils/generateIds');
const gravatar = require('gravatar');
const { sign } = require('../utils/jwt');


module.exports.register = async(req, res) => {
    try {
        const { nom, passwd, repasswd, email } = req.body;

        let validation = validateUser(nom, passwd, repasswd, email);

        if (validation == true) {
            await User.create({
                id: generateId(),
                nom: nom,
                passwd: setPassword(passwd),
                email: email,
                foto: gravatar.url(this.email, { protocol: 'https' }),
                estado: 0
            });

            res.status(200).json({ msg: "Tot ok" });
        } else {
            res.json(validation);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

module.exports.login = async(req, res) => {
    try {
        const { email, passwd } = req.body;

        console.log(User);

        var user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            if (passwordCheck(passwd, user.passwd)) {
                res.json({
                    token: sign(user.id),
                    user: {
                        nom: user.nom,
                        foto: user.foto
                    }
                });
            } else {
                res.status(404).json({ msg: "Email o contraseña incorrectos" });
            }
        } else {
            res.status(404).json({ msg: "Email o contraseña incorrectos" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

module.exports.find = async(req, res) => {
    try {
        const user = req.user;

        console.log(user);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}