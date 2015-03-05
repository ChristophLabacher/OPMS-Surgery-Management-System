$(document).ready(function() {
	
	// Add guidlines for half hours
	$(".column-main").each(function()	{
		for(var i = 0; i < 47; i++)	{
			$(this).append("<hr style=\"top: " + (i * 60 + 60) + "px \">");
		}
	});
	
	
	// Scroll scales with timetable container
	$(".timetable-container").scroll(function()	{
		var y = -$(this).scrollTop();
		var x = -$(this).scrollLeft();
		console.log("scrolling");
		$(".schedule .scale-time").css("transform", "translateY(" + y + "px)");
		$(".schedule .scale-rooms").css("transform", "translateX(" + x + "px)");		
	});
	
});