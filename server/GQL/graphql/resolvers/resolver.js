var { merge } = require('lodash');

const QueryResolvers = {
    Query: {
        message: () => 'Hello World!',
        authenticationError: () => {
            throw new AuthenticationError('must authenticate');
        }
    }
}

// var SubscriptionResolvers = require('./subscriptions/subscription.resolver');
var HobbyResolvers = require('./hobbys/hobby.resolver');

const resolvers = merge(
    QueryResolvers,
    HobbyResolvers
);

module.exports = resolvers;