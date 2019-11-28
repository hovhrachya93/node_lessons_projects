const express = require('express');
const birds = require('./birds');

const app = express();
const port = 3000;

app.get('/birds', function(req, res, next) {
    console.log("Birds 1 called");
    next('route');
}, function(req, res, next) {
    console.log("Birds 2 called");
    next();
});
app.use('/birds', birds);
app.use(function(req, res, next) {
    console.log("Middleware called");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));