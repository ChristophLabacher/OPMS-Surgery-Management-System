$(document).ready(function() {
	bigUnit = 20 * 10;
	
	// Load the room data and set timetable width to fit in all rooms
	
	loadRoomData();
	var roomCount = rooms.length;
	
	$(".timetable").width(roomCount * bigUnit);
	$(".scale-rooms").width(roomCount * bigUnit);
	
	// Create the Room scale
	for (var i = 0; i < rooms.length; i++)	{		
		var room = "<li room=\"" + rooms[i].id + "\">Saal " + rooms[i].id;
		if (rooms[i].department)	{
			room += " <abbr>" + rooms[i].department + "</abbr>";
		}
		room += "</li>";
		
		$(".scale-rooms").append(room);
	}

	// Add guidlines for half hours
	$(".column-main").each(function()	{
		for(var i = 0; i < 47; i++)	{
			$(this).append("<hr style=\"top: " + (i * 60 + 60) + "px \">");
		}
	});
	
	
	// Scroll scales with timetable container
	$(".timetable-container").scroll(function()	{
		var y = -$(this).scrollTop();
		var x = -$(this).scrollLeft();
		$(".schedule .scale-time").css("transform", "translateY(" + y + "px)");
		$(".schedule .scale-rooms").css("transform", "translateX(" + x + "px)");		
	});
	
//	loadFileLocally()
	loadFileFromServer();
	getCards();
});

function loadRoomData()	{
	// Get json-file
	var request = new XMLHttpRequest();
		request.open("GET", "../data/rooms.json", false);
		request.send(null);
	// Put json-file into an array
	rooms = JSON.parse(request.responseText);
}

function loadFileFromServer()	{
	// Get json-file
	var request = new XMLHttpRequest();
		request.open("GET", "https://spreadsheets.google.com/feeds/list/1oiiPeRnUPX32MkmG8NFB0IauLrWtjoiEMQsE0sCRQ6I/od6/public/values?alt=json", false);
		request.send(null);
	// Put json-file into an array
	raw = JSON.parse(request.responseText);
	
	data = [];
	
	for (var i = 0; i < raw.feed.entry.length; i++)	{
		var surgeryRaw = raw.feed.entry[i];
		var surgery = {
			"Name" : surgeryRaw.gsx$name.$t,
			"Prename" : surgeryRaw.gsx$prename.$t,
			"Birthdate" : surgeryRaw.gsx$birthdate.$t,
			"Service" : surgeryRaw.gsx$service.$t,
			"Case_Id" : surgeryRaw.gsx$caseid.$t,
			"Surgery_Team" : surgeryRaw.gsx$surgeryteam.$t,
			"Surgery_Room" : surgeryRaw.gsx$surgeryroom.$t,
			"Current_State" : surgeryRaw.gsx$currentstate.$t,
			"Starttime" : surgeryRaw.gsx$starttime.$t,
			"Endtime" : surgeryRaw.gsx$endtime.$t
		};
		
		data.push(surgery);
	}
}


function loadFileLocally()	{
	// Get json-file
	var request = new XMLHttpRequest();
		request.open("GET", "../data/surgeries.json", false);
		request.send(null);
	// Put json-file into an array
	data = JSON.parse(request.responseText);
}

function getCards()	{
	for (var i = 0; i < data.length; i++)	{
		var Starttime = new Date(data[i].Starttime)
		var Endtime = new Date(data[i].Endtime)

		var top = (Starttime.getUTCHours() + Starttime.getUTCMinutes()/60) * 120;
		var height = ((Endtime.getUTCHours() + Endtime.getUTCMinutes()/60) - (Starttime.getUTCHours() + Starttime.getUTCMinutes()/60)) * 120;

		if (data[i].Surgery_Room != 0)	{
			var card =	"<div class=\"card-container\" action =\"show-card-detail\" case-id=\"" + data[i].Case_Id + "\" style=\"top:" + top + "px;\">" +
							"<div class=\"card\" style=\"height: " + height + "px;\">" +
								"<div class=\"handle handle-top\"></div><!-- handle-top -->" +
								
								"<div class=\"header state-" + data[i].Current_State + "\">";
			
			if (parseInt(data[i].Current_State) >= 8)	{
				card +=				"<img src=\"imgs/assets/icons/surgery.png\">";
			}
			
			 card +=				"<p class=\"name\">" + data[i].Name + ", " + data[i].Prename + "</p>" +
									"<p class=\"birthdate\">" + data[i].Birthdate + "</p>" +
								"</div><!-- header -->";
								
			if (height >= 120)	{
				card += "<div class=\"main\">" +
							"<p class=\"service\">" + data[i].Service + "</p>";
							
				if (height >= 150)	{
					card +=	"<p class=\"team\">OP: " + data[i].Surgery_Team + "</p>";
				}
				
				card +=		"</div><!-- main -->";
			}
								
			if (height >= 180)	{
				card += "<div class=\"footer\">" +
							"<p class=\"room\"> Saal " + data[i].Surgery_Room + "</p>" +
							"<p class=\"time\">" + addZero(Starttime.getUTCHours()) + ":" + addZero(Starttime.getUTCMinutes()) + " – " + addZero(Endtime.getUTCHours()) + ":" + addZero(Endtime.getUTCMinutes()) + "</p>" +
						"</div><!-- footer -->";
			}
																				
			card +=				"<div class=\"handle handle-bottom\"></div><!-- handle-bottom -->" +
						
							"</div><!-- card -->" +
						"</div><!-- card-container -->"
			
			$(".column[room='" + data[i].Surgery_Room + "'] .column-main").prepend(card);
		} else 	{
			var card =	"<div class=\"card-container\" action =\"show-card-detail\" case-id=\"" + data[i].Case_Id + "\" \">" +
							"<div class=\"card\" style=\"height: " + height + "px;\">" +
								"<div class=\"handle handle-top\"></div><!-- handle-top -->" +
								
								"<div class=\"header state-" + data[i].Current_State + "\">" +
									"<p class=\"name\">" + data[i].Name + ", " + data[i].Prename + "</p>" +
									"<p class=\"birthdate\">" + data[i].Birthdate + "</p>" +
								"</div><!-- header -->";
								
			if (height >= 150)	{
				card += "<div class=\"main\">" +
							"<p class=\"service\">" + data[i].Service + "</p>";
							
				if (height >= 180)	{
					card +=	"<p class=\"team\">OP: " + data[i].Surgery_Team + "</p>";
				}
				
				card +=		"</div><!-- main -->";
			}
								
			if (height >= 120)	{
				card += "<div class=\"footer\">" +
							"<p class=\"time\">" + ((Endtime.getTime() - Starttime.getTime())/3600000)  + " Stunden </p>" +
						"</div><!-- footer -->";
			}
																				
			card +=				"<div class=\"handle handle-bottom\"></div><!-- handle-bottom -->" +
						
							"</div><!-- card -->" +
						"</div><!-- card-container -->"
			
			$(".center-side .content .open-surgeries").prepend(card);			
		}

	}	
}
		
function addZero(num){
	return (num<10?"0":"")+num;
}