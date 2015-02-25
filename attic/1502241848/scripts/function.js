$(document).ready(function() {
	
	// When the nav is clicked toggle active and exchange the arrow icon
	$("nav .expand").click(function()	{
		if($("nav").hasClass("inactive"))	{
			$("nav").removeClass("inactive").addClass("active");
			$(this).find("li").html("<img src=\"imgs/assets/icons/arrow-left.png\"> Menü einklappen");
		} else	{
			$("nav").removeClass("active").addClass("inactive");
			$(this).find("li").html("<img src=\"imgs/assets/icons/arrow-right.png\"> Menü einklappen");
		}
	});
	
	$(".toolbar > .action-list li").click(function()	{
		if($(this).hasClass("right"))	{
			$(this).toggleClass("active");
			$(".content-side").toggleClass("active");
		} else	{	
			$(this).toggleClass("active");
			$(".toolbar").toggleClass("active");
		}
	});

	// When the table is scrolled transform the scales accordingly
	$(".table").scroll(function() {
		var scrollLeft = $( ".table" ).scrollLeft();
		$( ".scale-room" ).css("transform", "translateX(" + -scrollLeft + "px)");		
		
		var scrollTop = $( ".table" ).scrollTop();
		$( ".scale-time" ).css("transform", "translateY(" + -scrollTop + "px)");		
	});
});