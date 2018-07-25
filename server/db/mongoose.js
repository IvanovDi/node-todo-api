const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//fetch uri for connect to mongo server
mongoose.connect( process.env.MONGODB_URI, {
    useMongoClient: true
});

module.exports = {
    mongoose
};