// const { makeExecutableSchema,  } = require('graphql-tools');
const path = require('path');
// const { loadFilesSync, mergeTypeDefs } = require('graphql-tools');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { graphqlExpress } = require('apollo-server-express');
// const { Bar, newBar } = require('./bars/bars.graphql');
// import * as barType from './bars/bars.graphql'
// const { barResolvers } = require('./bars/bars.resolvers');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
// const merge = require('lodash.merge');



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

// const schema = makeExecutableSchema({
//     typeDefs: [
//         schemaDefinition,
//         Bar,
//         newBar
//     ],
//     resolvers: merge({},
//         dateResolver,
//         barResolvers
//     )
// })


// const graphQLRouter = graphqlExpress((req) => ({
//     schema: schema
// }))

const typesArray = loadFilesSync(path.join(__dirname, './bars'));
// const typesArray = loadFilesSync('./bars');

module.exports = mergeTypeDefs(typesArray, { all: true });