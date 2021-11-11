const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Hobby{
        _id: ID!
        nom: String!
        descr: String!
    }

    type DeleteResponse{
        ok: Boolean!
    }

    input newHobbyInput {
        nom: String!
        descr: String!
    }

    input idInput {
        id: ID!
    }

    extend type Query {
        getYourHobbys: [Hobby!]
        deleteHobby(idInput: idInput): DeleteResponse
    }

    extend type Mutation {
        newHobby(newHobby: newHobbyInput): Hobby!
        updateHobby(idInput: idInput, newHobby: newHobbyInput): Hobby!
    }
`;

module.exports = typeDefs;