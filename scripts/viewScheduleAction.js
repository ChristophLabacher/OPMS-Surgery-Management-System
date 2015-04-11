$(document).ready(function()	{
	
	/************************
	*	Expand MAIN-SIDE	*
	************************/
	$("[action = 'expand-center-side']").click(function()	{	
		var target = $(this).closest(".view").find(".center-side");
			
		if (target.hasClass("active"))	{

		} else	{
			
		}
		
		target.toggleClass("active");
		$(this).toggleClass("active");
	});
	
	/************************
	*	Expand COLUMN		*
	************************/
	var activeColumns = 0;
	
	$("[action = 'show-card-detail']").click(function()	{	
		var target1 = $(this).closest(".column");
		var room = target1.attr("room");
		var target2 = $(".scale-rooms li[room = '" + room + "']");
		
		var currentWidth = $(".timetable").outerWidth();
		
		if (target1.hasClass("active"))	{
			$(".timetable").width(currentWidth - 3 * bigUnit);
			$(".scale-rooms").width(currentWidth + 3 * bigUnit);

			activeColumns--;
		} else	{
			$(".timetable").width(currentWidth + 3 * bigUnit);
			$(".scale-rooms").width(currentWidth + 3 * bigUnit);

			activeColumns++;
		}
		
		target1.toggleClass("active");
		target2.toggleClass("active");
	});
	
	/************************
	*	Edit Section		*
	************************/
	$("[action = 'edit-section']").click(function()	{	
		var target = $(this).closest(".data");
			
		if (target.hasClass("editing"))	{
			target.find("input").attr("readonly", "");
			target.find("textarea").attr("readonly", "");
			target.find("select").attr("disabled", "");
			
			$(this).attr("src", "imgs/assets/icons/edit.png");
		} else	{
			target.find("input").removeAttr("readonly");
			target.find("textarea").removeAttr("readonly");
			target.find("select").removeAttr("disabled");
			
			$(this).attr("src", "imgs/assets/icons/confirm.png");
		}
		
		target.toggleClass("editing");
	});
	
	/************************
	*Update Barchart-Legend	*
	************************/
	
	$(".column-details .barchart-bars div[start]").mouseover(function()	{
		$(this).parent().find(".active").removeClass("highlight");
		
		var startTime = $(this).attr("start");
		var endTime = $(this).next("div").attr("start");
		var state = $(this).attr("state");
		
		var print = "";
		
		if (endTime)	{
			print = startTime + " bis " + endTime;
		} else	{
			print = "Seit " + startTime;
		}
			
		print += " · " + states[state].title;
		
		var legendClass = "text-state-" + state;
		
		var target = $(this).closest(".barchart").find(".barchart-legend");
		
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	})
	
	$(".column-details .barchart-bars div.next").mouseover(function()	{
		$(this).parent().find(".active").removeClass("highlight");

		var state = $(this).attr("state");
		
		var print = "„" + states[state].title + "“ jetzt starten";
		
		var legendClass = "text-state-" + state;
		
		var target = $(this).closest(".barchart").find(".barchart-legend");
		
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	});
	
	$(".column-details .barchart-bars").mouseout(function()	{
		var source = $(this).closest(".barchart").find(".barchart-bars div.active");
		source.addClass("highlight");
		
		var startTime = $(source).attr("start");
		var state = $(source).attr("state");
		
		var print = "Seit " + startTime +  " · " + states[state].title;
		
		var legendClass = "text-state-" + state;
		
		var target = $(source).closest(".barchart").find(".barchart-legend");
		
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	});
});