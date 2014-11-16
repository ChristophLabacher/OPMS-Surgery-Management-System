$(document).ready(function() {
	setSize();
	
	$(".card-container").each(function()	{
		var mainHeight2 = $(this).outerHeight() - $(this).find("header").outerHeight() - $(this).find("footer").outerHeight();
		$(this).find(".main").outerHeight(mainHeight2);
	});	

});

$(window).resize(function() {
	setSize();
});

// Set the size of the main container
function setSize()	{
	
	// Height of the main-element: Screen height - header - footer
	var mainHeight = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();
		console.log($(window).height());
	console.log($("header").outerHeight() );
	console.log($("footer").outerHeight() );

	console.log(mainHeight);
	$("main").outerHeight(mainHeight);	
	
	// Width of toolbar and content: Screen width - nav
	var contentWidth = $(window).width() - $("nav").outerWidth();
	$(".content").outerWidth(contentWidth);	
	$(".toolbar").outerWidth(contentWidth);	
	
	// Height of content: main - toolbar
	var contentHeight = $("main").outerHeight() - $(".toolbar").outerHeight();
	$(".content").outerHeight(contentHeight);	
	
	// Height of timetable = height of timescale
	var timetableHeigth = $(".timescale").outerHeight();
	$(".timetable").outerHeight(timetableHeigth);
	
	var timetableWidth = 0;
	$(".column").each(function()	{
		timetableWidth += $(this).outerWidth();
	});	
	$(".timetable").outerWidth(timetableWidth);	
	$(".timetable").css("margin-left", $(".timescale").outerWidth());	
	
	$(".timescale").css("padding-top", $(".column header").outerHeight());	


}