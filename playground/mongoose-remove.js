const {ObjectID} = require('mongoose');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {User} = require('./../server/model/user');


//remove all items in database
Todo.remove({}).then((result) => {
    console.log(result);
});


Todo.findOneAndRemove({_id: '5b509a00d16598922456908f'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5b509a00d16598922456908f').then((todo) => {
    console.log(todo);
});