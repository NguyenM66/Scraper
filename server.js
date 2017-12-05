//dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
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

// //use morgan logger for logging requests
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
mongoose.connect("mongodb://localhost/scraper", {
  useMongoClient: true
});


//Routes

app.get("/scrape", function(req, res) {
	request("https://news.ycombinator.com", function(error, response, html) {
		
		if(!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var result = [];
		    $('span.comhead').each(function(i, element){
		      var a = $(this).prev();
		      //console.log(a.text());
		      var rank = a.parent().parent().text();
		      var title = a.text();
		      var url = a.attr('href');
		      var subtext = a.parent().parent().next().children('.subtext').children();
		      var points = $(subtext).eq(0).text();
		      var username = $(subtext).eq(1).text();
		      var comments = $(subtext).eq(2).text();
		      // Our parsed meta data object
		      var metadata = {
		        rank: parseInt(rank),
		        title: title,
		        url: url,
		        points: parseInt(points),
		        username: username,
		        comments: parseInt(comments)
		      }
		      result.push(metadata);
		      console.log(metadata);
		    })
		    //res.json(result);
		    //res.render("index", result);
		    db.Article 
		      	.create(result)
		      	.then(function(dbArticle) {
		      		res.send(dbArticle);
		      		//res.json(result);
		    		//res.render("index", result);
		      	})
		      	.catch(function(err) {
		      		res.json(err);
		      	})
		}
	});
});

app.get("/", function(req,res) {
	db.Article
		.find({})
		.then(function(dbArticle) {
			res.render("index", {article: dbArticle});
		})
		.catch(function(err) {
			res.json(err);
		})
})

app.get("/saved", function(req, res) {
	db.Article
		.find({saved: true})
		.then(function(dbArticle) {
			res.render("saved", {article: dbArticle});
		})
		.catch(function(err) {
			res.json(err);
		})
})

app.get("/articles", function(req, res) {
	// db.Article
	// 	.find({})
	// 	.then(function(dbArticle) {
	// 		res.json(dbArticle);
	// 	})
	// 	.catch(function(err) {
	// 		res.json(err);
	// 	})
})

app.put("/articles/:id/:bool", function(req, res) {
	db.Article
	.findOneAndUpdate({_id: req.params.id}, {saved: req.params.bool}, {new: true})
	.then(function(dbArticle) {
		console.log("Saved Article");
		res.json(dbArticle);
	})
	.catch(function(err) {
		res.json(err);
	})
})

app.post("/articles/:id", function(req, res) {

})

//start the server
app.listen(PORT, function() {
	console.log("App running on port" + PORT + "!");
})