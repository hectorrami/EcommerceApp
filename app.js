const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const app = express();
require('dotenv').config();

const {
  PORT,
  MONGO_DB,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
} = process.env;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

console.log('DB being used: ', MONGO_DB);

const serverPort = PORT;

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(serverPort);
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
