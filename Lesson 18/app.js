var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('title', 'Cool Application');
app.set('requestsCounter', 0);

app.use((req, res, next) => {
	var reqCounter = req.app.get('requestsCounter');
    req.app.set('requestsCounter', ++reqCounter);
	next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
	console.log(req.query);
	if (req.query.colorScheme === '2') {
		res.locals.colorScheme = {
			mainColor: '#d16a2e'
		};
	} else {
		res.locals.colorScheme = {
			mainColor: '#d16aff'
		};
	}
	next();
});

app.get('/animals', (req, res) => {
	let animals = [
		{ name: 'Alligator' },
		{ name: 'Crocodile' }
	];
	res.render('animals.ejs', { animals: animals });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
