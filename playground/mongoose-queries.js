const {ObjectID} = require('mongoose');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {User} = require('./../server/model/user');

var id = '5b509a00d16598922456908f';

// if(!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({_id: id})
//     .then((todos) => {
//         console.log('Todos', todos);
//     });
//
// Todo.findOne({_id: id})
//     .then((todo) => {
//         console.log('Todo', todo);
//     });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log(todo);
}).catch(err => console.log(err));

var userId = '5b50535b1c5ea65f2c35d94f';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Not found user by id');
    }

    console.log(user);
})
    .catch(err => console.log(err));