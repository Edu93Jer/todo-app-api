require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

mongoose
  .connect('mongodb://localhost/todo-list-api', { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

app.use(
  cors({
    credentials: true,
    'Access-Control-Allow-Credentials': true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: ['http://localhost:3000'],
  })
);

app.use(logger('dev'));
app.use(express.json({ extended: false }));
app.use(cookieParser());

const listRoutes = require('./routes/list.routes');
app.use('/api', listRoutes);

module.exports = app;
