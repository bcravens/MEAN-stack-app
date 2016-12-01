var mongoose = require("./connection.js");
var seedData = require("./seeds.json");

var Event = mongoose.model("Event");

Event.remove({}).then(function(){
  Event.collection.insert(seedData).then(function(){
    process.exit();
  })
})
