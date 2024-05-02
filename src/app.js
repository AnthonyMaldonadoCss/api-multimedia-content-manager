const express = require('express');
const dotenv = require('dotenv');
const routes =  require('./routes/routes');
const auth =  require('./middleware/auth');

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( '/user', routes.userRoutes );
app.use( '/topics', auth, routes.topicsRoutes );
app.use( '/categories', auth, routes.categoriesRoutes );

module.exports = app;