const mongoose = require('mongoose');

const ASchema = new mongoose.Schema({
   section: {
      type: Number,
      min: 1,
      max: 2,
      required: true
   },
   foor: {
      type: Number,
      min: 1,
      max: 3,
      required: true
   },
   room: {
      type: Number,
      min: 1,
      max: 5,
      required: true
   },
   miter: [Number],
   userID: mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model("addresses", ASchema)