const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Hobby{
        _id: ID!
        nom: String!
        descr: String!
        id_user: String!
    }

    input newHobby {
        nom: String!
        descr: String!
        id_user: String!
    }

    extend type Query {
        getYourHobbys(_id: ID!): Hobby!
    }

    extend type Mutation {
        newHobby(hobby: newHobby): Hobby!
        deleteHobby(_id: ID!): Hobby
    }
`;

module.exports = typeDefs;