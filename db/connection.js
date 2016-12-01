var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/events");

var EventSchema = new mongoose.Schema({
  author: String,
  host_org: String,
  event_title: String,
  date: String,
  time: String,
  location: String,
  event_url: String,
  description: String,
  category: String
});

mongoose.model("Event", EventSchema);

module.exports = mongoose;
