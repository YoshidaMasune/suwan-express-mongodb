const mongoose = require(mongoose);

const nimonesSchema = new mongoose.Schema({
   type: {
      type: String,
      required: true
   },
   monk:{
      type: Number,
      required: true
   },
   location: {
      type: String,
      required: true
   },
   detail: {
      type: String
   },
   data: {
      type: Date
   },
   time: {
      type: Date
   },
   userID: {
      type: mongoose.SchemaTypes.ObjectId,
   },
   addressIDL: {
      type: mongoose.SchemaTypes.ObjectId
   }
})

module.exports = mongoose.model("nimones", nimonesSchema)