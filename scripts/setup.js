$(document).ready(function() {
	setSize();
});

$(window).resize(function() {
	setSize();
});

// Set the size of the main container
function setSize()	{
	
	// Height of the main-element: Screen height - header - footer
	var centerHeight = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();	
	$("nav").outerHeight(centerHeight);	
	$("main").outerHeight(centerHeight);	
		
	$("schedule").outerHeight(centerHeight);	

}