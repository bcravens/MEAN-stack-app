var express = require("express");
var bodyParser = require("body-parser");
// var methodOverride = require("method-override");
var mongoose = require("./db/connection")

var Event = mongoose.model("Event");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(methodOverride('_method'));
app.use("/assets", express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.get("/api/events", function(req, res){
  Event.find({}).then(function(events){
    res.json(events);
  })
})

app.get("/api/events/:event_title", function(req, res){
  Event.findOne({event_title: req.params.event_title}).then(function(event){
    res.json(event);
  })
})

app.post("/api/events", function(req, res){
  Event.create(req.body).then(function(event){
    res.json(event);
    // res.redirect("/events/" + req.body.event_title);
  })
});


app.delete("/api/events/:event_title", function(req, res){
  Event.findOneAndRemove({event_title: req.params.event_title}).then(function(){
    res.json({success: true});
    // res.redirect("/events")
  });
});

app.put("/api/events/:event_title", function(req, res){
  Event.findOneAndUpdate({event_title: req.params.event_title}, req.body, {new: true}).then(function(event){
    res.json(event);
  });
});

app.listen(4000, function(){
  console.log("Port 4000: app is listening!");
});
