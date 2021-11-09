const { gql } = require('apollo-server-express');

const Query = gql `
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
`;

// var Subscription = require('./subscriptions/subscription.schema');
var Hobby = require('./hobbys/hobby.schema');

const typeDefs = [
    Query,
    Hobby
];

module.exports = typeDefs;