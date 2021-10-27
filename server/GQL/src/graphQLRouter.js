const { makeExecutableSchema } = require('graphql-tools');
const { graphqlExpress } = require('apollo-server-express');
import * as barType from './bars/bars.graphql';
const { barResolvers } = require('./bars/bars.reolvers');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const merge = require('lodash.merge');



const schemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;


const dateResolver = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value = the client
        },
        serialize(value) {
            return new Date(value); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
};

export const schema = makeExecutableSchema({
    typeDefs: [
        schemaDefinition,
        barType
    ],
    resolvers: merge({},
        dateResolver,
        barResolvers
    )
})


export const graphQLRouter = graphqlExpress((req) => ({
    schema: schema
}))