const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  address : Object,
  userReviews: Array,
  events: Array,
  role: {
        type: String,
        enum : ['USER','EDITOR', 'ADMIN'],
        default : 'USER'
    }
},
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
const User = mongoose.model("User", userSchema);
module.exports = User;
