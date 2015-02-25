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
});