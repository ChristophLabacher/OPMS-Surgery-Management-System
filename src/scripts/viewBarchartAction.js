$(document).ready(function() {
	
	/************************
	*Update Barchart-Legend	*
	************************/
	$(".room .barchart").on("mouseover", ".barchart-bars div.bar", function()	{
		var startTime = $(this).attr("start");
		var endTime = $(this).next("div").attr("start");
		var state = $(this).attr("state");

		var print = "";

		if (endTime)	{
			print = startTime + " bis " + endTime;
		} else	{
			print = "Seit " + startTime;
		}

		print += " · " + states[state-1].title;

		var legendClass = "text-state-" + state;

		var target = $(this).closest(".barchart").find(".legend");

		target.removeClass().addClass("legend").addClass(legendClass);
		target.text(print);
	})


	$(".room .barchart").on("mouseout", ".barchart-bars", function()	{
		var source = $(this).closest(".barchart").find(".barchart-bars div.bar.active");


		var startTime = $(source).attr("start");
		var state = $(source).attr("state");

		if (state > 0)	{
			var print = "Seit " + startTime +  " · " + states[state-1].title;
		}

		var legendClass = "text-state-" + state;

		var target = $(source).closest(".barchart").find(".legend");

		target.removeClass().addClass("legend").addClass(legendClass);
		
		if(state == 11)	{
			target.addClass("past");
		}
		
		target.text(print);
	});

});