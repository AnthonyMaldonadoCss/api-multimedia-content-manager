const express = require('express');
const dotenv = require('dotenv');
const routes =  require('./routes/routes');
const auth =  require('./middleware/auth');

const app = express();

dotenv.config();

const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const options = require('./swaggerOptions');

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prefix = '/apiv1';

app.use( `${prefix}/users`, routes.userRoutes );
app.use( `${prefix}/topics`, auth, routes.topicsRoutes );
app.use( `${prefix}/categories`, auth, routes.categoriesRoutes );

module.exports = app;