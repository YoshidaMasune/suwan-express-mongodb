const mongoose = require('mongoose');
const { URLDB } = process.env;

mongoose.connect(URLDB)

module.exports = mongoose.connection;