var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    })
        .catch((error) => {
            res.status(400).send(error);
        })
});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }

        res.status(200).send({todo});
    })
        .catch(err => res.status(400).send());

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app};





