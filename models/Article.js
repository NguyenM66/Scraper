var mongoose = require("mongoose");

//save reference to schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	headline:{
		type: String,
	}
	summary: {
		type: String,
	}
	url: {
		type: String,
	}
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

//creates model from above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

//export Article model
module.exports = Article;
