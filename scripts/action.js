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
		var target = $(this).closest(".view").find(".toolbar");

		$(this).toggleClass("active");		
		target.toggleClass("active");
	});
});