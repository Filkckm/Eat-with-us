const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;
const User      = require('./user');

const PartySchema = new Schema({
  partyName       : String,
  partyLocation   : Object,
  partyDate       : Date,
  partyTime       : String,
  partyType       : String,
  partyGuests     : Number,
  vegetarian      : Boolean,
  partyPrice      : Number,
  partyHost_id    : String,
  partyDescription: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Party = mongoose.model("Party", PartySchema);

module.exports = Party;
