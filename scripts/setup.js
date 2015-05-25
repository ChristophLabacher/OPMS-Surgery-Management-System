$(document).ready(function() {
	now = new Date("2014-12-08T14:37:11");
	loadStateData()	
	loadRoomData();
	
	replaceSVG();
	
	//loadFileLocally()
	loadFileFromServer();

	data = [];

	for (var i = 0; i < raw.feed.entry.length; i++)	{
		var surgeryRaw = raw.feed.entry[i];

		if (surgeryRaw.gsx$details.$t == "TRUE")	{
			var surgery	= {
				"Name" : surgeryRaw.gsx$name.$t,
				"Prename" : surgeryRaw.gsx$prename.$t,
				"Birthdate" : surgeryRaw.gsx$birthdate.$t,
				"Service" : surgeryRaw.gsx$service.$t,
				"Case_Id" : surgeryRaw.gsx$caseid.$t,
				"Surgery_Team" : surgeryRaw.gsx$surgeryteam.$t,
				"Surgery_Room" : surgeryRaw.gsx$surgeryroom.$t,
				"Current_State" : surgeryRaw.gsx$currentstate.$t,
				"Starttime" : surgeryRaw.gsx$starttime.$t,
				"Endtime" : surgeryRaw.gsx$endtime.$t,
				"Patient_Id" : surgeryRaw.gsx$patientid.$t,
				"Station" : surgeryRaw.gsx$station.$t,
				"Station_Phone" : surgeryRaw.gsx$stationphone.$t,
				"Station_Room" : surgeryRaw.gsx$stationroom.$t,
				"Diagnosis" : surgeryRaw.gsx$diagnosis.$t,
				"Risk" : surgeryRaw.gsx$risk.$t,
				"Comment" : surgeryRaw.gsx$comment.$t,
				"Timestamps" : [
					surgeryRaw.gsx$state1timestamp.$t,
					surgeryRaw.gsx$state2timestamp.$t,
					surgeryRaw.gsx$state3timestamp.$t,
					surgeryRaw.gsx$state4timestamp.$t,
					surgeryRaw.gsx$state5timestamp.$t,
					surgeryRaw.gsx$state6timestamp.$t,
					surgeryRaw.gsx$state7timestamp.$t,
					surgeryRaw.gsx$state8timestamp.$t,
					surgeryRaw.gsx$state9timestamp.$t,
					surgeryRaw.gsx$state10timestamp.$t,
					surgeryRaw.gsx$state11timestamp.$t
				],

				"Details" : true
			}

		} else	{
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
				"Endtime" : surgeryRaw.gsx$endtime.$t,
				"Details" : false
			};
		}

		data.push(surgery);
	}
	
	// Scroll to schedule
	var size = $("main").outerHeight();
	$("main article").css("top", -1 * size);
});

function loadStateData()	{
	// Get json-file
	var request = new XMLHttpRequest();
		request.open("GET", "data/states.json", false);
		request.send(null);
	// Put json-file into an array
	states = JSON.parse(request.responseText);
}

function replaceSVG()	{
	$('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});
}

function loadRoomData()	{
	// Get json-file
	var request = new XMLHttpRequest();
		request.open("GET", "data/rooms.json", false);
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
}


function loadFileLocally()	{
	// Get json-file
	var request = new XMLHttpRequest();
		request.open("GET", "data/surgeries.json", false);
		request.send(null);
	// Put json-file into an array
	raw = JSON.parse(request.responseText);
}

