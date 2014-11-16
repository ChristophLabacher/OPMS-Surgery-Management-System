$(document).ready(function() {
	
	$(".column").click(function()	{
		$(this).toggleClass("active");
	})
	
	$(".content").scroll(function() {
		var scrollLeft = $( ".content" ).scrollLeft();
		$( ".timescale" ).css("left", scrollLeft + "px");		
		
		var scrollTop = $( ".content" ).scrollTop();
		$( ".column header" ).css("top", scrollTop + "px");		
	});
});