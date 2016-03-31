$(document).ready(function()	{
	
	/************************
	*	Expand NAV		*
	************************/
	$("[action = 'expand-nav']").click(function()	{		
		if ($("nav").hasClass("active"))	{
			$(this).find("li img").attr("src", "imgs/assets/icons/arrow-right.png");
		} else	{
			$(this).find("li img").attr("src", "imgs/assets/icons/arrow-left.png");
			
		}
		
		$("nav").toggleClass("active");
	});
	
	/************************
	*	Expand TOOLBAR		*
	************************/
	$(".toolbar ul[action = 'expand-toolbar'] li").click(function()	{	
		var target = $(this).closest(".center").find(".toolbar");

		$(this).toggleClass("active");		
		target.toggleClass("active");
	});
	
	/************************
	*	Change VIEW			*
	************************/
	var first = true;
	
	$("nav ul li").click(function()	{
		var scroll = $(this).attr("scroll");
		var size = $("main").outerHeight();
		
		$("nav ul li").removeClass("active");
		$(this).addClass("active").removeClass("emergency");
		
		$("main article").css("top", -scroll * size);
		
		if (first)	{
			$("nav li.schedule").addClass("emergency");
			first = false;
		}
	});
});