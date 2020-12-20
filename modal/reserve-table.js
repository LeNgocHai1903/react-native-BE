const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  numberofguest: {type: Number},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  guestName: {type:String},
  smoking : {type:Boolean},
  date: { type: Date },
  
});

module.exports = mongoose.model("Bill", PlaceSchema);
