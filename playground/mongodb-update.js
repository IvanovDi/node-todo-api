const {connect, ObjectID} = require('mongodb');

connect.connect('mongodb://localhost:27017/TodoApp', (err,  db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b4f55aed99635a9e6299e29')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b4f38e9dd07e9639e8ddf48')
    }, {
        $set: {
            name: 'New Name'
        },
        $inc: {
            age: 3
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.close();
});