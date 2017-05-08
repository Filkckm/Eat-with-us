const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//const Review = require('./review')

const partySchema = new Schema({
  partyName: String,
  partyLocation: Object,
  partyDate: Date,
  partyTime: String,
  partyType: String,
  partyGuests: Number,
  vegetarian: Boolean,
  partyPrice: Number,
  partyHost_id: String,
  partyDescription: String,
  //  reviews    : [Review.schema]
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
