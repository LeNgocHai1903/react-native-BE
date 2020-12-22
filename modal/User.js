const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  image: {type:String},
  password: { type: String, required: true, minlength: 5 },
  email: { type: String, required: true, unique: true },
  bill : [{ type: mongoose.Types.ObjectId, required: true, ref: "Bill" }]
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);