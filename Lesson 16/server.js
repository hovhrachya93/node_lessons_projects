const connect = require('connect');
const setup = require('./logger.js');
const errorHandler1 = require('./errors.js')(1);
const errorHandler2 = require('./errors.js')(2);

function middleware1(req, res, next) {
    console.log('middleware1');

    res.setHeader('Content-Type', 'text/plain');
    next(new Error('Intentional error'));
}

function middleware2(req, res, next) {
    console.log('middleware2');
    next();
}

const app = connect()
    .use(setup(':method :url'))
    .use(errorHandler1)
    .use(middleware1)
    .use(middleware2)
    .use(errorHandler2)
    .listen(3000);