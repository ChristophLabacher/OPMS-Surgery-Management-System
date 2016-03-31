$(document).ready(function()	{
	
	// Drag and DropstartTimeMin
	$(".card .header").each(function()	{
		var dragTimeout = 400;
		$(this).mousedown(function(e){
			var ms = 0;
			timer = setInterval(function(){ms += 50}, 50);
			targetHeight = $(this).closest(".card");
			targetTop = $(this).closest(".card-container");
			targetTime = $(this).closest(".card");
			
			e.preventDefault();
			e.stopPropagation();
			
			setTimeout(function(e){
				if(ms >= dragTimeout){
					$("[action = 'show-card-detail']").off();

					pos = e.pageY;
					posBuf = e.pageY;	
					
					$(".timetable").on("mousemove", function(e) {
						pos = e.pageY;
						var delta = pos - posBuf;
						
						if (delta >= 30)	{
							var top = targetTop.position().top;
							var newTop = top + 30 - (top%30);
							targetTop.css("top", newTop);
							posBuf = e.pageY;
							changeTime(targetTime);
						} else if (delta <= -30) {
							var top = targetTop.position().top;
							var newTop = top - 30 - (top%30);
							targetTop.css("top", newTop);
							posBuf = e.pageY;
							changeTime(targetTime);
						}
					});
					
					$(".timetable").mouseup(function(e){
						$(".timetable").off();
						
						e.preventDefault();
						e.stopPropagation();
						
						setTimeout(function() {
							$("[action = 'show-card-detail']").on("click", showCardDetail);
						}, 100);
						
						clearInterval(timer);
					});
					
				}
			}, 450, e);
		});
		
		$(this).mouseup(function(e){
			$(".timetable").off();
			
			e.preventDefault();
			e.stopPropagation();
			
			setTimeout(function() {
				$("[action = 'show-card-detail']").on("click", showCardDetail);
			}, 100);
			
			clearInterval(timer);
		});
	});


	
	// Resize Bottom
	$(".card .handle-bottom").each(function()	{
		var dragTimeout = 400;
		$(this).mousedown(function(e){
			var ms = 0;
			timer = setInterval(function(){ms += 50}, 50);
			targetHeight = $(this).closest(".card");
			targetTop = $(this).closest(".card-container");
			targetTime = $(this).closest(".card");
						
			e.preventDefault();
			e.stopPropagation();
			
			setTimeout(function(e){
				if(ms >= dragTimeout){
					$("[action = 'show-card-detail']").off();

					pos = e.pageY;
					posBuf = e.pageY;	
					
					$(".timetable").on("mousemove", function(e) {
						pos = e.pageY;
						var delta = pos - posBuf;
						
						if (delta >= 30)	{
							var height = targetHeight.height();
							var newHeight = height + 30 - (height%30)
							targetHeight.height(newHeight);
							posBuf = e.pageY;
							changeTime(targetTime);
						} else if (delta <= -30) {
							var height = targetHeight.height();
							var newHeight = height - 30 - (height%30)
							targetHeight.height(newHeight);
							posBuf = e.pageY;
							changeTime(targetTime);
						}
					});
					
					$(".timetable").mouseup(function(e){
						$(".timetable").off();
						
						e.preventDefault();
						e.stopPropagation();
						
						setTimeout(function() {
							$("[action = 'show-card-detail']").on("click", showCardDetail);
						}, 100);
						
						clearInterval(timer);
					});
					
				}
			}, 450, e);
		});
		
		$(this).mouseup(function(e){
			$(".timetable").off();
			
			e.preventDefault();
			e.stopPropagation();
			
			setTimeout(function() {
				$("[action = 'show-card-detail']").on("click", showCardDetail);
			}, 100);
			
			clearInterval(timer);
		});
	});
	
	
	// Resize Top
	$(".card .handle-top").each(function()	{
		var dragTimeout = 400;
		$(this).mousedown(function(e){
			var ms = 0;
			timer = setInterval(function(){ms += 50}, 50);
			targetHeight = $(this).closest(".card");
			targetTop = $(this).closest(".card-container");
			targetTime = $(this).closest(".card");
									
			e.preventDefault();
			e.stopPropagation();
			
			setTimeout(function(e){
				if(ms >= dragTimeout){
					$("[action = 'show-card-detail']").off();

					pos = e.pageY;
					posBuf = e.pageY;	
					
					$(".timetable").on("mousemove", function(e) {
						pos = e.pageY;
						var delta = pos - posBuf;
						
						if (delta >= 30)	{
							var height = targetHeight.height();
							var newHeight = height - 30 - (height%30);
							var top = targetTop.position().top;
							var newTop = top + 30 - (top%30);

							targetHeight.height(newHeight);
							targetTop.css("top", newTop);

							posBuf = e.pageY;
							changeTime(targetTime);
						} else if (delta <= -30) {
							var height = targetHeight.height();
							var newHeight = height + 30 - (height%30);
							var top = targetTop.position().top;
							var newTop = top - 30 - (top%30);

							targetHeight.height(newHeight);
							targetTop.css("top", newTop);
							
							posBuf = e.pageY;
							changeTime(targetTime);
						}
					});
					
					$(".timetable").mouseup(function(e){
						$(".timetable").off();
						
						e.preventDefault();
						e.stopPropagation();
						
						setTimeout(function() {
							$("[action = 'show-card-detail']").on("click", showCardDetail);
						}, 100);
						
						clearInterval(timer);
					});
					
				}
			}, 450, e);
		});
		
		$(this).mouseup(function(e){
			$(".timetable").off();
			
			e.preventDefault();
			e.stopPropagation();
			
			setTimeout(function() {
				$("[action = 'show-card-detail']").on("click", showCardDetail);
			}, 100);
			
			clearInterval(timer);
		});
	});
	
	function changeTime(target)	{
		var top = targetTop.position().top;
		var height = targetHeight.height() - (targetHeight.height()%30);
			
		var startTime = Math.round((top/120)*1000)/1000;
		var startTimeMin = (startTime - Math.floor(startTime)) * 60;
		var startTimeHour = Math.floor(startTime);
		
		var endTime = Math.round((top/120)*1000)/1000 + Math.round((height/120)*1000)/1000;
		var endTimeMin = (endTime - Math.floor(endTime)) * 60;
		var endTimeHour = Math.floor(endTime);

		var timeString = addZero(startTimeHour) + ":" + addZero(startTimeMin) + " – " + addZero(endTimeHour) + ":" + addZero(endTimeMin);
		
		target.find(".footer .time").text(timeString);
	}
});