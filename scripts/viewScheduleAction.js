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
	$("body").on("click", "[action = 'edit-section']", function()	{
		var target = $(this).closest(".data");

		if (target.hasClass("editing"))	{
			removeEditability(target);
			$(this).attr("src", "imgs/assets/icons/edit.png");
		} else	{
			addEditability(target);
			$(this).attr("src", "imgs/assets/icons/confirm.png");
		}

		if (target.hasClass("timestamps"))	{
			if (target.hasClass("editing"))	{
				setTimeout(function(){
					target.find(".next").attr("value", "Starten");
				}, 300)
			} else	{
				target.find(".next").attr("value", "");
			}
		}
		
		target.toggleClass("editing");
	});
	
	/************************
	*Update Barchart-Legend	*
	************************/
	$(".column-details .barchart-bars").on("mouseover", "div[start]", function()	{
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
			
		print += " · " + states[state-1].title;
		
		var legendClass = "text-state-" + state;
		
		var target = $(this).closest(".barchart").find(".barchart-legend");
		
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	})
	
	$(".column-details .barchart-bars").on("mouseover", "div.next", function()	{
		$(this).parent().find(".active").removeClass("highlight");

		var state = $(this).attr("state");
		
		var print = "„" + states[state-1].title + "“ jetzt starten";
		
		var legendClass = "text-state-" + state;
		
		var target = $(this).closest(".barchart").find(".barchart-legend");
		
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	});
	
	$(".column-details").on("mouseout", ".barchart-bars", function()	{
		var source = $(this).closest(".barchart").find(".barchart-bars div.active");
		source.addClass("highlight");
		
		var startTime = $(source).attr("start");
		var state = $(source).attr("state");
		
		var print = "Seit " + startTime +  " · " + states[state-1].title;
		
		var legendClass = "text-state-" + state;
		
		var target = $(source).closest(".barchart").find(".barchart-legend");
		
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	});
	
	/************************
	*	Start Next State		*
	************************/
	$(".column-details .barchart-bars").on("click", "[action = 'start-next']", function()	{
		$(this).prev().removeClass("active");
		$(this).removeClass("inactive").removeClass("next").removeAttr("action").addClass("active");
		$(this).next().addClass("next").attr("action", "start-next");
		
		var date = new Date;
		var now = addZero(date.getUTCHours()) + ":" + addZero(date.getUTCMinutes());
		$(this).attr("start", now);
		
		$(this).addClass("highlight");
		
		var state = $(this).attr("state");

		var print = "Seit " + now +  " · " + states[state-1].title;
		var legendClass = "text-state-" + state;
		var target = $(this).closest(".barchart").find(".barchart-legend");
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
		
		var target = $(this).closest(".card-details-container").find(".timestamps").find("input.next");
		target.attr("value", now).removeClass("next").removeAttr("action");
		target.parent().parent().next().find("td:last-child input").addClass("next").attr("action", "start-next").attr("value", "Starten");
	});
	
	/************************
	*	Start Next State		*
	************************/
	$(".column-details .timestamps").on("click", "[action = 'start-next']", function()	{
		$(this).removeClass("next").removeAttr("action");
		$(this).parent().parent().next().find("td:last-child input").addClass("next").attr("action", "start-next").attr("value", "Starten");
		
		var date = new Date;
		var now = addZero(date.getUTCHours()) + ":" + addZero(date.getUTCMinutes());
		$(this).attr("value", now);
		
		var state = $(this).parent().parent().attr("state");
				
		var target = $(this).closest(".column-details").find(".barchart .barchart-bars .next");
		target.prev().removeClass("active").removeClass("highlight");
		target.removeClass("inactive").removeClass("next").removeAttr("action").addClass("active").addClass("highlight");
		target.next().addClass("next").attr("action", "start-next");
		target.attr("start", now);

		var print = "Seit " + now +  " · " + states[state-1].title;
		var legendClass = "text-state-" + state;
		target = $(this).closest(".column-details ").find(".barchart .barchart-legend");
		target.removeClass().addClass("barchart-legend").addClass(legendClass);
		target.text(print);
	});

});

function removeEditability(_target)	{
	_target.find("input").attr("readonly", "");
	_target.find("textarea").attr("readonly", "");
	_target.find("select").attr("disabled", "");
	_target.find(".switch input").attr("disabled", "");
}

function addEditability(_target)	{
	_target.find("input").removeAttr("readonly");
	_target.find("textarea").removeAttr("readonly");
	_target.find("select").removeAttr("disabled");
	_target.find(".switch input").removeAttr("disabled");
}