$(document).ready(function() {
	
	getRooms();
	getPatients();
	
	$(".lines").each(function()	{
		for (var i = 0; i < 18; i++)	{
			$(this).append("<li></li>");
		}
	});
	
	for (var i = 0; i < states.length; i++)	{
		$(".view.barchart .legend ul").append("<li class=\"text-state-" + (i+1) + "\">" + states[i].title + "</li>");
	}
	
	// Scroll timetable-container
	barchartScroll = new IScroll('.chart-container', {
		mouseWheel: true,
		scrollbars: true,
		scrollX: true,
		bounce: false,
		freeScroll: true,
		disableTouch: true,
		disablePointer: true,
		disableMouse: true,
		fadeScrollbars: true,
		scrollbars: 'custom',
		probeType: 3
	});
});

function getRooms()	{
	for (var i = 0; i < rooms.length; i++)	{
		var room = 				"<div class=\"room\" room=\"" + rooms[i].id + "\">" +
									"<div class=\"info\">" +
										"Saal " +  rooms[i].id;
		if (rooms[i].department)	{
			room += 					"<abbr>" + rooms[i].department + "</abbr>";
		}
		room +=						"</div><!-- info -->" +
									"<div class=\"patients\">" +
									"</div><!-- patients -->" +
									"<div class=\"barcharts\">	" +									
										"<ul class=\"lines\">" +
											"<li class=\"now\"></li>" +
											"<li class=\"now-top\"></li>" +
										"</ul>" +
									"</div><!-- barcharts -->" +
									"<div class=\"services\">" +
									"</div><!-- services -->" +
								"</div><!-- room -->";

		$(".chart").append(room);
	}	
}

function getPatients()	{
	for (var i = 0; i < data.length; i++)	{
		var Starttime = new Date(data[i].Starttime)
		var Endtime = new Date(data[i].Endtime)
		var target = $(".room[room='" + data[i].Surgery_Room + "']");

		if (data[i].Surgery_Room != 0)	{

			var patient = 				"<div class=\"patient\" case-id=\"" + data[i].Case_Id + "\">" +
											"<div class=\"name\">" + data[i].Name + ", " + data[i].Prename + "</div>" +
											"<div class=\"birthdate\">" + data[i].Birthdate + "</div>" +
										"</div>";
			target.find(".patients").append(patient);
			
			var service = 				"<div class=\"service\" case-id=\"" + data[i].Case_Id + "\">" +
											data[i].Service;
										"</div>";
										
			target.find(".services").append(service);			
			
			if (data[i].Details == true)	{

				if (data[i].Current_State > 0)	{
					var spacer = getTimeInPercent(new Date("2014-12-08T06:00:00"), new Date(data[i].Timestamps[0]));
					var barchart = 		"<div class=\"barchart\" case-id=\"" + data[i].Case_Id + "\">" +
											"<div class=\"barchart-bars clearfix\">" +
												"<div class=\"spacer\" style=\"width: " + spacer[2] + "%\"></div>";
					
					for (j = 1; j < data[i].Current_State; j++)	{
						var time = getTimeInPercent(new Date(data[i].Timestamps[j - 1]), new Date(data[i].Timestamps[j]));
						var startTime = addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes());
						barchart += "<div class=\"bar state-" + j + "\" start=\"" + startTime + "\" state=\"" + j + "\" style=\"width: " + time[2] + "%\"></div>"
					}
					
					if (j < 11)	{
						var time = getTimeInPercent(new Date(data[i].Timestamps[j - 1]), new Date(now));
						var startTime = addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes());

						barchart += "<div class=\"bar active state-" + j + "\" start=\"" + startTime + "\" state=\"" + j + "\" style=\"width: " + time[2] + "%\"></div>"
						
						barchart += "<div class=\"legend text-state-" + j + "\">" + "Seit " + addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes()) + " · " +states[data[i].Current_State - 1].title + "</div>";
					} else if (j == 11)	{
						var startTime = addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes());

						barchart += "<div class=\"bar active state-" + j + "\" start=\"" + startTime + "\" state=\"" + j + "\" style=\"width: 2%\"></div>";
						
						barchart += "<div class=\"legend past text-state-" + j + "\">" + "Seit " + addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes()) + " · " +states[data[i].Current_State - 1].title + "</div>";
					}
					
					barchart += 	"</div><!-- barchart-bars -->";
					
					barchart += "</div><!-- barchart -->";
					target.find(".barcharts").append(barchart);
				}
			} else	{
				var barchart = "<div class=\"barchart\" case-id=\"" + data[i].Case_Id + "\"></div><!-- barchart -->";
				target.find(".barcharts").append(barchart);
			}
			
			var startBuf = new Date(Starttime);
			startBuf.setUTCHours(Starttime.getUTCHours() - 6);
			var endBuf = new Date(Endtime);
			endBuf.setUTCHours(Endtime.getUTCHours() - 6);
			var nowBuf = new Date(now);
			nowBuf.setUTCHours(now.getUTCHours() - 6);
			
			var time = getTimeInPercent(startBuf, endBuf);
			var blocked = "<div class=\"blocked\" style=\"left: " + time[0] + "%; width: " + time[2] + "%\"></div>";
			target.find(".barcharts").append(blocked);
			
			if (startBuf < nowBuf && data[i].Details == true)	{
				$(".barchart[case-id='" + data[i].Case_Id + "']").append("<img class=\"left-edge\" src=\"imgs/assets/left-edge.png\" style=\"left: " + time[0] + "%\">");
			}
			
			if (endBuf < nowBuf && data[i].Details == true && new Date(data[i].Timestamps[data[i].Current_State - 1]) > Endtime)	{
				
				console.log();
				
				$(".barchart[case-id='" + data[i].Case_Id + "']").append("<img class=\"right-edge\" src=\"imgs/assets/right-edge.png\" style=\"left: " + time[1] + "%\">");
			}
			
			var h = $(".patient[case-id='" + data[i].Case_Id + "']").height();
			if ($(".service[case-id='" + data[i].Case_Id + "']").height() > h)	{
				h = $(".service[case-id='" + data[i].Case_Id + "']").height();
			}
						
			$(".patient[case-id='" + data[i].Case_Id + "']").height(h);
			$(".barchart[case-id='" + data[i].Case_Id + "']").height(h);
			$(".service[case-id='" + data[i].Case_Id + "']").height(h);
		}
	}
}

function getTimeInPercent(startTime, endTime)	{
	var start = startTime.getUTCHours() + (startTime.getUTCMinutes()/60);
	var end = endTime.getUTCHours() + (endTime.getUTCMinutes()/60);
	var startPerc = (start/18) * 100;
	var endPerc = (end/18) * 100;
	var durationPerc = endPerc - startPerc;

	return [startPerc, endPerc, durationPerc];
}