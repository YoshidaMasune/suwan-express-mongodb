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
   },
   internet: {
      type: Boolean,
      default: false
   },
   status: {
      type: Boolean,
      default: true
   }
})

module.exports = mongoose.model("users", usersSchema)