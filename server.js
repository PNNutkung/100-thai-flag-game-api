const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 18080;
const app = express();
const config = require('./config')

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, project_id, Authorization, o-Requested-With");
  next();
});
app.use(morgan('dev'))

require('./routes/routesManager')(app, express);
