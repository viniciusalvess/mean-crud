var mongoose = require('mongoose');
var cfg = require('../config.json')

mongoose.Promise = global.Promise;
mongoose.connect(cfg.db_url, {useMongoClient: true});

module.exports = mongoose;