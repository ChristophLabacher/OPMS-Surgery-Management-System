$(document).ready(function() {
	bigUnit = 20 * 10;

	// Load the room data and set timetable width to fit in all rooms
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
		
		var column = 	"<div class=\"column clearfix\" room=\""+ rooms[i].id +"\">" +
							"<div class=\"column-main\">" +
							"</div><!-- column-main -->" +
							"<div class=\"column-details\">" +
								"<div class=\"card-details-container clearfix\">" +
								"</div>" +
							"</div><!-- column-details -->" +
						"</div><!-- column -->";
			
		$(".timetable").append(column);			
	}

	// Add guidlines for half hours
	$(".column-main").each(function()	{
		for(var i = 0; i < 47; i++)	{
			$(this).append("<hr style=\"top: " + (i * 60 + 60) + "px \">");
		}

		$(this).append("<hr class=\"now\">");
		$(this).append("<hr class=\"now-top\">");
	});

	var h = $(".timetable-container").outerHeight();
	$(".column-details").height(h);


	// Scroll timetable-container
	timetableScroll = new IScroll('.timetable-container', {
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

	// Scroll scales with timetable container
	timetableScroll.on("scroll", function()	{
		$(".schedule .scale-time").css("transform", "translateY(" + this.y + "px)");
		$(".schedule .scale-rooms").css("transform", "translateX(" + this.x + "px)");

		$(".column-details").css("top", -this.y)
	});

	var pos = (14.61*120) - $(".timetable-container").height()/3;
	timetableScroll.scrollTo(0,-pos);
	$(".schedule .scale-time").css("transform", "translateY(" + timetableScroll.y + "px)");
	$(".column-details").css("top", -timetableScroll.y)

	// Scroll columnDetails
	$(".column-details").each(function(index)	{

		$(this).attr("id", "scroll_" + index);

	});

	getCards();
});

var cardDetails = [];

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
				card +=				"<img src=\"imgs/assets/icons/surgery.png\" class=\"naht active\">";
			} else	{
				card +=				"<img src=\"imgs/assets/icons/surgery.png\" class=\"naht\">";
			}

			 card +=				"<p class=\"name\">" + data[i].Name + ", " + data[i].Prename + "</p>" +
									"<p class=\"birthdate\">" + data[i].Birthdate + "</p>" +
								"</div><!-- header -->";

			if (height >= 120)	{
				card += "<div class=\"main\">" +
							"<p class=\"service\">" + data[i].Service + "</p>";

				if (height > 180)	{
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
			var card =	"<div class=\"card-container\" case-id=\"" + data[i].Case_Id + "\" \">" +
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

		if (data[i].Details == true)	{

			var details = 				"<div class=\"card-details-container clearfix\" case-id=\"" + data[i].Case_Id + "\">" +

											"<div class=\"header state-" + data[i].Current_State + "\">" +
												"<div class=\"header-info\">";

			if (data[i].Current_State >= 8)	{
				details +=							"<img src=\"imgs/assets/icons/surgery.png\" class=\"naht active\">"
			} else	{
				details +=							"<img src=\"imgs/assets/icons/surgery.png\" class=\"naht\">"
			}

			details +=								"<p class=\"name\">" + data[i].Name + ", " + data[i].Prename + "</p>" +
													"<p class=\"birthdate\">" + data[i].Birthdate + "</p>" +
												"</div><!-- header-info -->" +
											"</div><!-- header -->" +

											"<div class=\"barchart\">" +
												"<div class=\"barchart-bars clearfix\">";

			var j;

			if (data[i].Current_State > 0)	{
				for (j = 1; j < data[i].Current_State; j++)	{
					var time = addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes());
					details +=	"<div class=\"state-" + j + "\" state=\"" + j + "\" start=\"" + time + "\"></div>";
				}

				var time = addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes());
				details +=	"<div class=\"state-" + j + " active highlight\" state=\"" + j + "\" start=\"" + time + "\"></div>";
				j++;
			} else	{
				j = 1;
			}

			if (j < 12)	{
				details +=	"<div class=\"state-" + j + " inactive next\" state=\"" + j + "\" action=\"start-next\"></div>";
				j++;
			}

			var k = j;

			for (j = k; j < 12; j++)	{
				details +=	"<div class=\"state-" + j + " inactive\" state=\"" + j + "\"></div>";
			}

			details +=							"</div><!-- barchart-bars -->";

			if (data[i].Current_State > 0)	{
				var state = data[i].Current_State;
				details +=						"<div class=\"barchart-legend text-state-" + data[i].Current_State + "\">" + "Seit " + addZero(new Date(data[i].Timestamps[state - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[state - 1]).getUTCMinutes()) +  " · " + states[state - 1].title + "</div><!-- barchart-scale -->";
			} else	{
				details +=						"<div class=\"barchart-legend\"></div><!-- barchart-scale -->";
			}

			details +=						"</div><!-- barchart --> " +


											"<div class=\"patient-data data\">" +
												"<table class=\"data-table\">" +
													"<tr>" +
														"<th>Patienten-Daten</th>" +
														"<th><img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\"></th>" +
													"</tr>" +
													"<tr>" +
														"<td>Fallnummer</td>" +
														"<td><input value=\"" + data[i].Case_Id + "\" readonly></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Patientennummer</td>" +
														"<td><input value=\"" + data[i].Patient_Id + "\" readonly></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Station</td>" +
														"<td>" +
															"<select disabled>" +
																"<option>Ortho</option>" +
																"<option>NCh</option>" +
															"</select>" +
														"</td>" +
													"</tr>" +
													"<tr>" +
														"<td>Zimmer-Nummer</td>" +
														"<td><input value=\"" + data[i].Station_Room + "\" readonly></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Telefonnummer der Station</td>" +
														"<td><input value=\"" + data[i].Station_Phone + "\" readonly></td>" +
													"</tr>" +
												"</table>" +
											"</div><!-- patient-data -->" +

											"<div class=\"surgery-data data\">" +
												"<table class=\"data-table\">" +
													"<tr>" +
														"<th>OP-Daten</th>" +
														"<th><img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\"></th>" +
													"</tr>" +
													"<tr>" +
														"<td>Veranlasste Leistung</td>" +
														"<td><textarea readonly>" + data[i].Service + "</textarea></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Diagnose</td>" +
														"<td><textarea readonly>" + data[i].Diagnosis + "</textarea></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Risiken</td>" +
														"<td><textarea readonly>" + data[i].Risk + "</textarea></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Bemerkung zum Auftrag</td>" +
														"<td><textarea readonly>" + data[i].Comment + "</textarea></td>" +
													"</tr>" +
												"</table>" +
											"</div><!-- surgery-data -->" +

											"<div class=\"plan data\">" +
												"<table class=\"data-table\">" +
													"<tr>" +
														"<th>Planung</th>" +
														"<th><img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\"></th>" +
													"</tr>" +
													"<tr>" +
														"<td>Team</td>" +
														"<td><input value=\"OP: " + data[i].Surgery_Team + "\" readonly></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Raum</td>" +
														"<td>" +
															"<select disabled>";

			var j;
			for (j = 1; j < data[i].Surgery_Room; j++)	{
				details += "<option>Saal " + rooms[j - 1].id;

				if (rooms[j - 1].department)	{
					details += " · " + rooms[j - 1].department;
				}

				details += "</option>";
			}

			details += "<option selected>Saal " + rooms[j - 1].id;
			if (rooms[j - 1].department)	{
				details += " · " + rooms[j - 1].department;
			}
			details += "</option>";

			j++;

			var k = j;
			for (j = k; j < rooms.length; j++)	{
				details += "<option>Saal " + rooms[j - 1].id;

				if (rooms[j - 1].department)	{
					details += " · " + rooms[j - 1].department;
				}

				details += "</option>";			}

			details +=										"</select>" +
														"</td>" +
													"</tr>" +
													"<tr>" +
														"<td>Datum</td>" +
														"<td><input value=\"11.03.15\" readonly></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Zeitraum</td>" +
														"<td><input value=\"" + addZero(Starttime.getUTCHours()) + ":" + addZero(Starttime.getUTCMinutes()) + " – " + addZero(Endtime.getUTCHours()) + ":" + addZero(Endtime.getUTCMinutes()) + "\" readonly></td>" +
													"</tr>" +
													"<tr>" +
														"<td>Dauer</td>" +
														"<td><input value=\"" + Math.round(((Endtime.getTime() - Starttime.getTime())/3600000)*100)/100  + " Stunden\" readonly></td>" +
													"</tr>" +
												"</table>" +
											"</div><!-- plan -->" +

											"<div class=\"timestamps data\">" +
												"<table class=\"data-table\">" +
													"<tr>" +
														"<th>OP-Zeiten</th>" +
														"<th><img src=\"imgs/assets/icons/edit.png\" action=\"edit-section\"></th>" +
													"</tr>";

			var j;
			for (j = 1; j <= data[i].Current_State; j++)	{
			var time = addZero(new Date(data[i].Timestamps[j - 1]).getUTCHours()) + ":" + addZero(new Date(data[i].Timestamps[j - 1]).getUTCMinutes());
				details +=							"<tr state=\"" + j + "\">" +
														"<td>" + states[j - 1].title + "</td>" +
														"<td><input value=\"" + time + "\" class=\"text-state-" + j + "\" readonly></td>" +
													"</tr>";
			}

			if (j < 12)	{
				details +=							"<tr state=\"" + j + "\">" +
														"<td>" + states[j - 1].title + "</td>" +
														"<td><input value=\"Starten\" class=\"text-state-" + j + " next\" action=\"start-next\" readonly></td>" +
													"</tr>";
				j++;
			}

			var k = j;

			for (j = k; j < 12; j++)	{
				details +=							"<tr state=\"" + j + "\">" +
														"<td>" + states[j - 1].title + "</td>" +
														"<td><input value=\"\" class=\"text-state-" + j + "\" readonly></td>" +
													"</tr>";
			}

			details +=							"</table>" +
											"</div><!-- timestamps -->" +

										"</div> <!-- card-details-container -->"




			cardDetails[data[i].Case_Id] = details;
		}

	}
}