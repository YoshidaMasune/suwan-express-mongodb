const mongoose = require('mongoose');

const addminSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model("addmin", addminSchema)