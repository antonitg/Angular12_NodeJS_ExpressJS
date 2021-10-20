const { decode } = require('../utils/jwt');
const User = require('../models').user;

module.exports.authByToken = async(req, res, next) => {

    //Check for Authorization header
    const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null;

    if (!authHeader) {
        return res.status(422).json({
            errors: { body: ['Authorization failed', 'No Authorization header'] }
        });
    }

    //Check if authorization type is token
    if (authHeader[0] !== 'Token')
        return res.status(401).json({
            errors: { body: ['Authorization failed', 'Token missing'] }
        });

    //Check if token is valid
    const token = authHeader[1];
    try {
        const user = decode(token);

        if (!user) {
            throw new Error('No user found in token');
        }

        let time = new Date();

        if (user.exp < parseInt(time.getTime() / 1000)) {
            throw new Error('Expired token');
        }

        const this_user = await User.findOne({
            where: {
                id: user.id
            }
        })

        if (!this_user) {
            throw new Error("Invalid User");
        }

        req.user = this_user;
        return next();
    } catch (e) {
        return res.status(401).json({
            errors: { body: ['Authorization failed', e.message] }
        })
    }

}

module.exports.optionalAuth = async(req, res, next) => {
    //Check for Authorization header
    const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null;

    if (authHeader) {
        //Check if authorization type is token
        if (authHeader[0] !== 'Token')
            return res.status(401).json({
                errors: { body: ['Authorization failed', 'Token missing'] }
            });

        //Check if token is valid
        const token = authHeader[1];
        try {
            const user = decode(token);

            if (!user) {
                throw new Error('No user found in token');
            }

            let time = new Date();

            if (user.exp < parseInt(time.getTime() / 1000)) {
                throw new Error('Expired token');
            }

            const this_user = await User.findOne({
                where: {
                    id: user.id
                }
            })

            if (!this_user) {
                throw new Error("Invalid User");
            }

            req.user = this_user;
            return next();
        } catch (e) {
            return res.status(401).json({
                errors: { body: ['Authorization failed', e.message] }
            })
        }
    }

    req.user = false;
    return next();
}