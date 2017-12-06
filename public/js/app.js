
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
			alert("You deleted this article.");
		}
	})
})


//when the savenote button is clicked
$(document).on("click", "#saveNote", function() {
	//get id associated with article from submit button
	var articleId = $(this).val();
	console.log(articleId);

	//run POST to change note with what's entered in the input
	$.ajax({
		method: "POST",
		url: "/article/" + articleId,
		data: {
			//value from body input
			body: $("#bodyinput").val()
		}
	})
	.done(function(data) {
		console.log(data);
		//empty notes section

		$("#notesModal").modal("hide");
	});
	//empty title and body for note
	$("#bodyinput").val("");
})