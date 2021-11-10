module.exports.getTokenFromHeader = (req) => {

    const authHeader = req.headers.authorization ? req.headers.authorization.split(' ') : null;


    if (!authHeader) {
        return null;
    }

    //Check if authorization type is token
    if (authHeader[0] !== 'Token')
        return null;

    //Check if token is valid
    const token = authHeader[1];

    return token;
}