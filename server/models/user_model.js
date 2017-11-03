var mongoose = require('../config/mongoose_connection');

var UserSchema = mongoose.Schema({
    name:  String,
    email: String,
    password:   String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;