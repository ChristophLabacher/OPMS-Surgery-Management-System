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
});