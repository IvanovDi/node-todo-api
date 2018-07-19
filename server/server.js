var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
var {Todo} = require('./model/todo');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body.text);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((document) => {
        res.status(200).send(document);
    })
        .catch((error) => {
            res.status(400).send(error);
        });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});






