const express = require('express');
// const expressGql = require('express-graphql');
const conectarDB = require('./config/mongodb');
const cors = require("cors");
const morgan = require('morgan');
const { graphQLRouter } = require('./graphQLRouter');
const { graphiqlExpress } = require('apollo-server-express');
require('dotenv').config({ path: 'config/variables.env' });

const app = express();
conectarDB();

const port = process.env.PORT || 4001

app.disable('etag');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/graphql', graphQLRouter)
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }))

app.all('*', (req, res) => {
    res.status(404).json({ message: 'UnRecognized Route' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está corriendo perfectamente en el puerto http://localhost:${port}`)
})