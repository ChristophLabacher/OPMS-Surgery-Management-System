$(document).ready(function() {
	setSize();
	
	$(".column-cards").each(function()	{
		for(var i = 0; i < 47; i++)	{
			$(this).append("<hr style=\"top: " + (i * 60 + 60) + "px \">");
		}
	});
});

$(window).resize(function() {
	setSize();
});

// Set the size of the containers
function setSize()	{
	// Set body container to window height
	$("body").outerHeight($(window).height());
	
	// Set each center view to fill the centr
	var centerViewHeight = $(".center").outerHeight();
	$(".center-view").outerHeight(centerViewHeight);
	
	// Set the width of the room scale according to its content
	var widthScaleRoom = 0;
	$(".scale-room li").each(function()	{
		widthScaleRoom += $(this).outerWidth();
	});
	$(".scale-room").outerWidth(widthScaleRoom);
	
	// Set the size of the table-content to fit the scales
	$(".table-content").outerHeight($(".scale-time").outerHeight());
	$(".table-content").outerWidth($(".scale-room").outerWidth());
}