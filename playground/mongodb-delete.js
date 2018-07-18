const {connect, ObjectID} = require('mongodb');

connect.connect('mongodb://localhost:27017/TodoApp', (err,  db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });


    db.collection('Users').deleteMany({name: 'Sasha'}).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b4f39f55785ab643f717dab')
    }).then((result) => {
        console.log(result);
    });

    db.close();
});