const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//const Review = require('./review')

const newEventSchema = new Schema({
  eventName: String,
  eventLocation: Object,
  eventDate: Date,
  eventTime: String,
  eventType: String,
  eventGuests: Number,
  vegetarian: Boolean,
  eventPrice: Number,
  eventHost_id: String,
  //  reviews    : [Review.schema]
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const newEvent = mongoose.model("newEvent", newEventSchema);

module.exports = newEvent;
