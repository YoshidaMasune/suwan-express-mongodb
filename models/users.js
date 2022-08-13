const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
   first_name: {
      type: String,
      required: true
   },
   last_name: {
      type: String,
      required: true
   },
   jaya: {
      type: String
   }
})

module.exports = mongoose.model("users", usersSchema)