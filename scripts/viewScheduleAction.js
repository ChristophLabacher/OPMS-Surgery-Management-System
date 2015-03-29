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
});