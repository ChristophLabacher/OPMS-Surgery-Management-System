$(document).ready(function() {
	
	// Add guidlines for half hours
	$(".column-main").each(function()	{
		for(var i = 0; i < 47; i++)	{
			$(this).append("<hr style=\"top: " + (i * 60 + 60) + "px \">");
		}
	});
	
	// Setup scrolling
	myScroll = new IScroll('#timetable-scrollable', {
		scrollX: true,
		scrollY: true,
		
		mouseWheel: true,
		scrollbars: true,
		keyBindings: true,
		
		click: true,
		disableMouse: true,
		freeScroll: true,
		momentum: false,
		bounce: false,
		
		probeType: 2
		
	});
	
	myScroll.on('scroll', function()	{
		console.log(this.x + " - " + this.y);
		
		$(".schedule .scale-time").css("transform", "translateY(" + this.y + "px)");
		$(".schedule .scale-rooms").css("transform", "translateX(" + this.x + "px)");

	});

	
});