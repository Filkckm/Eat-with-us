const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  address : Object,
  userReviews: Array,
  events: Array
},
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const User = mongoose.model("User", UserSchema);

module.exports = User;
