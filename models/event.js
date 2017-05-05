const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  eventName: String,
  eventLocation: String,
  eventDate: Date,
  eventTime: String,
  eventType: String,
  eventGuests: Number,
  vegetarian: Boolean
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const event = mongoose.model("Event", eventSchema);

module.exports = event;
