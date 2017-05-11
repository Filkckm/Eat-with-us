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
  partyHost      : String,
  partyDescription: String,
  location: {
  	type: {type: String},
  	coordinates: [Number]
  }
  // user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

PartySchema.index({location: '2dsphere'});
const Party = mongoose.model("Party", PartySchema);

module.exports = Party;
