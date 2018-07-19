var {mongoose} = require('../db/mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim:true,
        minlength: 2
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }
});

module.exports = {User};