const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, next) => {
    console.log("Get request all articles");

    Article.all((err, articles) => {
        if (err) {
            return next(err);
        }
        res.send(articles);
    });
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("Get request ", id);

    Article.find(id, (err, article) => {
        if (err) {
            return next(err);
        }
        res.send(article);
    });
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("Get request ", id);

    Article.delete(id, (err) => {
        if (err) {
            return next(err);
        }
        res.send({ message: 'Deleted' });
    });
});

app.post('/articles', (req, res, next) => {
    console.log("Post request ", JSON.stringify(req.body));
    const body = req.body;

    Article.create(
        { title: body.title, content: body.content },
        (err, article) => {
            if (err) {
                return next(err);
            }
            console.log(article);
            res.status(201).send('OK');
        }
    );
});

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;
