var { ApolloServer } = require('apollo-server-express');
var { AuthenticationError } = require('apollo-server-express');
var typeDefs = require('../../graphql/schemas/schema');
var resolvers = require('../../graphql/resolvers/resolver');
const auth = require('../auth');
const requests = require('./requests');

const SERVER = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: async({ req, res }) => {
        try {
            let user = null;
            if (auth.getTokenFromHeader(req)) {
                user = await requests.get_user_token(auth.getTokenFromHeader(req));
                // console.log(user);
                if (!user.user) {
                    throw { status: 403, message: 'Access denied' };
                } else if (!user.user.id) {
                    throw { status: 403, message: 'Access denied' };
                }
            }

            return { user, AuthenticationError };
        } catch (error) {
            console.log(error);
            if (!error.status) error.status = 500;
            res.status(error.status).send(error);
        }
    },
});

const SERVERS = {
    graphql: SERVER
};

module.exports = SERVERS;