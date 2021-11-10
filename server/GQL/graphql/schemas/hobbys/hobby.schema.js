const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Hobby{
        _id: ID!
        nom: String!
        descr: String!
        id_user: String!
    }

    input newHobbyInput {
        nom: String!
        descr: String!
    }

    extend type Query {
        getYourHobbys(_id: ID!): Hobby!
        deleteHobby(_id: ID!): Hobby
    }

    extend type Mutation {
        newHobby(newHobby: newHobbyInput): Hobby!
        updateHobby(_id: ID!, newHobby: newHobbyInput!): Hobby!
    }
`;

module.exports = typeDefs;