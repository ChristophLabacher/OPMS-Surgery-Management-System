$(document).ready(function() {
	bigUnit = 20 * 10;

	$(".lines").each(function()	{
		for (var i = 0; i < 24; i++)	{
			$(this).append("<li></li>");
			console.log(i);
		}
	});
	
	// Scroll timetable-container
	barchartScroll = new IScroll('.chart-container', {
		mouseWheel: true,
		scrollbars: true,
		scrollX: true,
		bounce: false,
		freeScroll: true,
		disableTouch: true,
		disablePointer: true,
		disableMouse: true,
		fadeScrollbars: true,
		scrollbars: 'custom',
		probeType: 3
	});
});