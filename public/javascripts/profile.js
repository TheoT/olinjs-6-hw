$(function() {
 	$( "#carousel" ).rcarousel({
 		width: 500,
		height: 400, 
  		visible:1, 
  		step:1,
  		speed: 300,
		auto: {
			enabled: false
		},
  	});
  	$("#submitComment").click(function() {
  		$.post("/comment",
        {photoId: $("#currentPhoto").attr('photoId'), commentText: $("#commentText").val()},
        function (success){
          $("#commentText").val(success ? "Post successful!" : "Post unsuccessful, try again");
        });
  	});
});

