
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Party    = require('./party');

const UserSchema = new Schema({
  username      : String,
  password      : String,
  address       : Object,
  description   : String,
  userReviews   : Array,
  partys        : [{ type: Schema.Types.Object, ref: 'Party' }],
  role: {
        type: String,
        enum : ['USER','EDITOR', 'ADMIN'],
        default : 'USER'
    }
},
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
const User = mongoose.model("User", UserSchema);
module.exports = User;
