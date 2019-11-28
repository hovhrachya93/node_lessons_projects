const env = process.env.NODE_ENV || 'development';

function errorHandler(param, err, req, res, next) {
    res.statusCode = 500;
    switch (env) {
        case 'development':
            console.error(`Error caught by errorHandler ${param}:`);
            console.error(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(err));
            break;
        default:
            res.end('Server error');
    }
}

module.exports = (param) => errorHandler.bind(undefined, param);
