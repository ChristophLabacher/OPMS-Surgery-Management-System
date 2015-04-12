$(document).ready(function()	{

	/************************
	*	SEARCH PATIENT		*
	************************/
	$(".add-surgery [action = 'search']").click(function()	{	
		var target = $(this).closest(".patient-data").find(".search-result");
			
		target.removeClass("hidden");
	});
	
	/************************
	*	SELECT PATIENT		*
	************************/
	$(".add-surgery [action = 'select-patient']").click(function()	{	
		var target = $(this).closest(".patient-data").find(".patient");
		
		target.find("tr th:first-child").text("Patient");
		target.find("tr th:nth-child(2)").html("<img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\">");
		target.removeClass("editing");
		removeEditability(target);
		target.find("tr.button").remove();
		
			
		$(this).closest(".search-result").addClass("hidden");
		$(this).closest(".patient-data").find(".medical-data").removeClass("hidden");
		
		target = $(this).closest(".add-surgery").find(".surgery-data");
		target.find(".surgery").removeClass("inactive");
	});
	
	/************************
	*	CREATE SURGERY		*
	************************/
	$(".add-surgery [action = 'create-surgery']").click(function()	{	
		var target = $(this).closest(".add-surgery").find(".patient-data .medical-data");
		target.find("tr th:nth-child(2)").html("<img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\">");
		target.removeClass("editing");
		removeEditability(target);
		
		target = $(this).closest(".surgery-data").find(".surgery");
		target.find("tr th:nth-child(2)").html("<img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\">");
		target.removeClass("editing");
		removeEditability(target);
		
		$(this).closest(".surgery-data").find(".surgery-properties").removeClass("hidden");
		$(this).closest("tr.button").remove();
	});
	
	/************************
	*	SAVE DATA			*
	************************/
	$(".add-surgery [action = 'save-properties']").click(function()	{	
		var target = $(this).closest(".surgery-data").find(".surgery-properties");
		target.find("tr th:nth-child(2)").html("<img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\">");
		target.removeClass("editing");
		removeEditability(target);		
		
		var surgery = "<div class=\"card-container new-card\" style=\"margin-top: -250px;\" action=\"show-card-detail\" case-id=\"905834220\" \"=\"\"><div class=\"card\" style=\"height: 240px;\"><div class=\"handle handle-top\"></div><!-- handle-top --><div class=\"header state-0\"><p class=\"name\">Maier, Ursula</p><p class=\"birthdate\">13.04.1949</p></div><!-- header --><div class=\"main\"><p class=\"service\">Implementation zementfreie HTP li.</p><p class=\"team\">OP: AVJ, AJW, BAP</p></div><!-- main --><div class=\"footer\"><p class=\"time\">2 Stunden </p></div><!-- footer --><div class=\"handle handle-bottom\"></div><!-- handle-bottom --></div><!-- card --></div>";
		
		target = $(this).closest(".center-side");
		target.find(".open-surgeries").prepend(surgery);
				
		setTimeout(function() {
			$(".new-card").css("margin-top", 0).removeClass(".new-card");
		}, 100)
		
		setTimeout(function() {
			target.toggleClass("active");
			target.find(".toolbar li[action = 'expand-center-side']").toggleClass("active");			
		}, 1000);
		
		$(this).closest("tr.button").remove();
	});

});