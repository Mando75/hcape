const express = require('express');
const expressValidator = require('express-validator');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
import {router as apiRoot} from "./routes/api-root";
import {decode_auth} from "./resolvers/v1/auth/helpers/decode_auth";
import {authStrategy} from "./resolvers/v1/auth/helpers/strategy";
const app = express();
const path = require('path');
const passport = require('passport');

global.appRoot = path.resolve(__dirname);

passport.use(authStrategy);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mongoSanitize());
app.use(passport.initialize());
app.use(expressValidator());
app.use('/static', express.static(path.join(__dirname, 'client/build/static')));
app.use(decode_auth);

app.use('/api', apiRoot);

// app.use('/s', (req, res)=> {
//   res.redirect('/');
// });
// app.use('/t', (req, res)=> {
//   res.redirect('/');
// });
//
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
