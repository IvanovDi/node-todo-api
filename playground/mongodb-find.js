const {connect, ObjectID} = require('mongodb');

connect.connect('mongodb://localhost:27017/TodoApp', (err,  db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b4f37bef3f1a66312ebc049')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((err) => {
    //     console.log(err);
    // });


    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos');
    //     console.log(`Count of Todos - ${count}`);
    // }).catch((err) => {
    //     console.log(err);
    // });

    db.collection('Users').find({
        name: 'Sasha'
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch((err) => {
        console.log(err);
    });

    db.collection('Users').find({
        name: 'Sasha'
    }).count().then((count) => {
        console.log('Todos');
        console.log(`Count users with name Sasha ${count}`);
    }).catch((err) => {
        console.log(err);
    });

    db.close();
});