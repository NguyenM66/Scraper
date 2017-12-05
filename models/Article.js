var mongoose = require("mongoose");

//save reference to schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	rank:{
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	saved: {
		type: Boolean,
		required: true,
		default: false
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

//creates model from above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

//export Article model
module.exports = Article;
