$(document).ready(function() {
	loadFile();
	getCards();
});

function loadFile()	{
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
		console.log(i + ": " + Starttime);

		var top = (Starttime.getUTCHours() + Starttime.getUTCMinutes()/60) * 120;
		var height = ((Endtime.getUTCHours() + Endtime.getUTCMinutes()/60) - (Starttime.getUTCHours() + Starttime.getUTCMinutes()/60)) * 120;

		var card = "<article class=\"card-container\" style=\"top: " + top + "px;\">" +
						"<div class=\"card\" style=\"height: " + height + "px;\">" +
							"<section class=\"header state-" + data[i].Current_State + "\">" +
								"<p>" + data[i].Prename + " " + data[i].Name + "</p>" +
								"<p>" + data[i].Birthdate + "</p>" +
							"</section>" +
							
							"<section class=\"main\">" +
								"<p class=\"diagnose\">" + data[i].Diagnosis + "</p>" +
								"<p>OP: " + data[i].Surgery_Team + "</p>" +
							"</section>";
		if (height >= 180 && height < 200)	{				
			card +=			"<section class=\"footer\">" +
								"<p>" + addZero(Starttime.getUTCHours()) + ":" + addZero(Starttime.getUTCMinutes()) + " – " + addZero(Endtime.getUTCHours()) + ":" + addZero(Endtime.getUTCMinutes()) + "</p>" +
							"</section>";
		} else if (height >= 200)	{
			card +=			"<section class=\"footer\">" +
								"<p>Saal " + data[i].Surgery_Room + "</p>" +
								"<p>" + addZero(Starttime.getUTCHours()) + ":" + addZero(Starttime.getUTCMinutes()) + " – " + addZero(Endtime.getUTCHours()) + ":" + addZero(Endtime.getUTCMinutes()) + "</p>" +
							"</section>";			
		}
 
		card +=			"</div>" + 
					"</article>";
		
		$(".column-container[room='" + data[i].Surgery_Room + "']").find(".column-cards").prepend(card);

	}	
}
		
function addZero(num){
	return (num<10?"0":"")+num;
}