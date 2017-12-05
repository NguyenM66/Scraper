
$(document).on("click", ".scrapeNew", function(req, res) {
	console.log("Clicked");
	$.ajax({
		method: "GET",
		url: "/scrape"
	})
	.done(function(data) {
		console.log(data);
		location.reload();
		alert("You have 30 New Articles")
	})
})

$(document).on("click", ".saveBtn, .deleteBtn", function() {
	console.log("Clicked");
	var articleId = $(this).data("id");
	console.log(articleId);
	var bool = $(this).data("bool");
	console.log(bool);
	$.ajax({
		method: "PUT",
		url: "/articles/" + articleId + "/" + bool
	})
	.done(function(data) {
		console.log(data);
		location.reload();

		if(data.saved){
			alert("You saved this article.");
		}else {
			alert("You deleted this article.")
		}
	})
})

$(document).on("click", ".saveNote", function(req, res) {
	

})
//when the p tag is clicked
$(document).on("click", "p", function() {
	//empty notes from note section
	$("#note").empty();
	//save the id from the p tag
	var thisId = $(this).attr("data-id");

	//ajax call for the Article
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
	.done(function(data) {
		console.log(data);
		//headline of article
		$("#note").append("<h2>" + data.headline + "</h2>");
		//input to enter new note title
		$("#note").append("<input id='titleinput' name='title'>");
		//text are to add new note
		$("#note").append("<textarea id='bodyinput' name='body'></textarea>");
		//button to submit new note, with id or article saved to it
		$("#note").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

		//if there's a note in the article
		if(data.note) {
			//put title of note in titleinput
			$("#titleinput").val(data.note.title);
			//put body of note in body textarea
			$("#bodyinput").val(data.note.body);
		}
	});
});

//when the savenote button is clicked
$(document).on("click", "#savenote", function() {
	//get id associated with article from submit button
	var thisId = $(this).attr("data-id");

	//run POST to change note with what's entered in the input
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			//value from title input
			title: $("#titleinput").val(),
			//value from body input
			body: $("#bodyinput").val()
		}
	})
	.done(function(data) {
		console.log(data);
		//empty notes section
		$("#note").empty();
	});
	//empty title and body for note
	$("#titleinput").val("");
	$("#bodyinput").val("");
})