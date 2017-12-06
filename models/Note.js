var mongoose = require("mongoose");

//save reference to schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	body: {
		type: String
	}
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;