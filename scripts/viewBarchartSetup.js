$(document).ready(function() {
	
	getRooms();
	getPatients();
	
	$(".lines").each(function()	{
		for (var i = 0; i < 24; i++)	{
			$(this).append("<li></li>");
		}
	});
	
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
/*
		var room = "<li room=\"" + rooms[i].id + "\">Saal " + rooms[i].id;
		if (rooms[i].department)	{
			room += " <abbr>" + rooms[i].department + "</abbr>";
		}
		room += "</li>";
*/

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

			var patient = 				"<div class=\"patient\">" +
											"<div class=\"name\">" + data[i].Name + ", " + data[i].Prename + "</div>" +
											"<div class=\"birthdate\">" + data[i].Birthdate + "</div>" +
										"</div>";
			target.find(".patients").append(patient);
			
			var service = 				"<div class=\"service\">" +
											data[i].Service;
										"</div>";
										
			target.find(".services").append(service);			
			
			if (data[i].Details == true)	{
				console.log("i");
				if (data[i].Current_State > 0)	{
					var spacer = getTimeInPercent(new Date("2014-12-08T00:00:00"), new Date(data[i].Timestamps[0]));
					var barchart = 		"<div class=\"barchart\">" +
											"<div class=\"barchart-bars clearfix\">" +
												"<div class=\"spacer\" style=\"width: " + spacer[2] + "%\"></div>";
					
					for (j = 1; j < data[i].Current_State; j++)	{
						var time = getTimeInPercent(new Date(data[i].Timestamps[j - 1]), new Date(data[i].Timestamps[j]));
						barchart += "<div class=\"state-" + j + "\" style=\"width: " + time[2] + "%\"></div>"
					}
					
					if (j < 11)	{
						var time = getTimeInPercent(new Date(data[i].Timestamps[j - 1]), new Date(now));
						barchart += "<div class=\"state-" + j + "\" style=\"width: " + time[2] + "%\"></div>"
					} else if (j == 11)	{
						barchart += "<div class=\"state-" + j + "\" style=\"width: 1%\"></div>";
					}
					
					barchart += 	"</div><!-- barchart-bars -->";
					barchart += "</div><!-- barchart -->";
					target.find(".barcharts").append(barchart);
				}
			}
			
			var time = getTimeInPercent(Starttime, Endtime);
			var blocked = "<div class=\"blocked\" style=\"left: " + time[0] + "%; width: " + time[2] + "%\"></div>";
			target.find(".barcharts").append(blocked);
		}
	}
}

function getTimeInPercent(startTime, endTime)	{
	var start = startTime.getUTCHours() + (startTime.getUTCMinutes()/60);
	var end = endTime.getUTCHours() + (endTime.getUTCMinutes()/60);
	var startPerc = (start/24) * 100;
	var endPerc = (end/24) * 100;
	var durationPerc = endPerc - startPerc;

	return [startPerc, endPerc, durationPerc];
}