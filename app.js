var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var indexRouter = require('./routes/index');
var wodRouter = require('./routes/wordOfTheDay');
var defWodRouter = require('./routes/defWod');
var synonymsWodRouter = require('./routes/synonymsWod');
var antonymsWodRouter = require('./routes/antonymsWod');
var examplesWodRouter = require('./routes/examplesWod');
var fullDictWodRouter = require('./routes/fullDictWod');
var fullDictWordOfTheDayRouter = require('./routes/fullDictWordOfTheDay');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
app.use('/word-of-the-day', wodRouter);                               // this corresponds to word of the day 
app.use('/def', defWodRouter); 
app.use('/syn', synonymsWodRouter);  
app.use('/ant', antonymsWodRouter);
app.use('/ex', examplesWodRouter); 
app.use('/dict', fullDictWodRouter);
app.use('/dict-word-of-the-day', fullDictWordOfTheDayRouter);  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
