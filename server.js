//dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//scraping tools: works on client and server
var request = require("request");
var cheerio = require("cheerio");

//require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

//initialize express
var app = express();

//configure middleware

//use morgan logger for logging requests
app.use(logger("dev"));
//use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

//sets up Handlebars app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//set mongoose to leverage built in JavaScript ES6 Promises
//connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater", {
  useMongoClient: true
});


//Routes

app.get("/scrape", function(req, res) {

})

app.get("/articles", function(req, res) {

})

app.get("/articles/:id", function(req, res) {

})

app.post("/articles/:id", function(req, res) {

})

//start the server
app.listen(PORT, function() {
	console.log("App running on port" + PORT + "!");
})