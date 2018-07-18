// const mongoClient = require('mongodb').connect;

const {connect, ObjectID} = require('mongodb');


// const obj = new ObjectID();
// console.log(obj);

connect.connect('mongodb://localhost:27017/TodoApp', (err,  db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Sasha',
        age: 22,
        location: 'USA'
    }, (err, result) => {
        if (err) {
            return err;
        }

        console.log(JSON.stringify(result.ops, undefined, 2));

        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});