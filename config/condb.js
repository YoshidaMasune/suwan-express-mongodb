const mongoose = require('mongoose');
const { URLDB } = process.env;

mongoose.connect(URLDB, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log(`mongoDB connected`)
})
.catch(err => console.log(err))

module.exports = mongoose.connection;