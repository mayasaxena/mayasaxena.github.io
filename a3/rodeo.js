var request;
var mbta;
var myLat = 0;
var myLong = 0;
var myLoc = new google.maps.LatLng(myLat, myLong);
var myOptions = {
                zoom: 13, // The larger the zoom number, the bigger the zoom
                center: myLoc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var contentString = "";

var stations;
var redLine = [];
var redLineFork = [];
var orangeLine = [];
var blueLine = [];
var scheduleData;

var line;
var lineColor;
var lineIcon;

function init() {
        mbta = new XMLHttpRequest();
        mbta.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        getMyLocation();
        readStations();
        mbta.onreadystatechange = dataReady; //rval has to be a function
        mbta.send(null);

}

function readStations()
{
    stations = [
  {
    "line":"Blue",
    "station":"Wonderland",
    "lat":42.41342,
    "long":-70.991648
  },
  {
    "line":"Blue",
    "station":"Revere Beach",
    "lat":42.40784254,
    "long":-70.99253321
  },
  {
    "line":"Blue",
    "station":"Beachmont",
    "lat":42.39754234,
    "long":-70.99231944
  },
  {
    "line":"Blue",
    "station":"Suffolk Downs",
    "lat":42.39050067,
    "long":-70.99712259
  },
  {
    "line":"Blue",
    "station":"Orient Heights",
    "lat":42.386867,
    "long":-71.00473599999999
  },
  {
    "line":"Blue",
    "station":"Wood Island",
    "lat":42.3796403,
    "long":-71.02286539000001
  },
  {
    "line":"Blue",
    "station":"Airport",
    "lat":42.374262,
    "long":-71.030395
  },
  {
    "line":"Blue",
    "station":"Maverick",
    "lat":42.36911856,
    "long":-71.03952958000001
  },
  {
    "line":"Blue",
    "station":"Aquarium",
    "lat":42.359784,
    "long":-71.051652
  },
  {
    "line":"Blue",
    "station":"State Street",
    "lat":42.358978,
    "long":-71.057598
  },
  {
    "line":"Blue",
    "station":"Government Center",
    "lat":42.359705,
    "long":-71.05921499999999
  },
  {
    "line":"Blue",
    "station":"Bowdoin",
    "lat":42.361365,
    "long":-71.062037
  },
  {
    "line":"Orange",
    "station":"Oak Grove",
    "lat":42.43668,
    "long":-71.07109699999999
  },
  {
    "line":"Orange",
    "station":"Malden Center",
    "lat":42.426632,
    "long":-71.07411
  },
  {
    "line":"Orange",
    "station":"Wellington",
    "lat":42.40237,
    "long":-71.077082
  },
  {
    "line":"Orange",
    "station":"Sullivan",
    "lat":42.383975,
    "long":-71.076994
  },
  {
    "line":"Orange",
    "station":"Community College",
    "lat":42.373622,
    "long":-71.06953300000001
  },
  {
    "line":"Orange",
    "station":"North Station",
    "lat":42.365577,
    "long":-71.06129
  },
  {
    "line":"Orange",
    "station":"Haymarket",
    "lat":42.363021,
    "long":-71.05829
  },
  {
    "line":"Orange",
    "station":"State Street",
    "lat":42.358978,
    "long":-71.057598
  },
  {
    "line":"Orange",
    "station":"Downtown Crossing",
    "lat":42.355518,
    "long":-71.060225
  },
  {
    "line":"Orange",
    "station":"Chinatown",
    "lat":42.352547,
    "long":-71.062752
  },
  {
    "line":"Orange",
    "station":"Tufts Medical",
    "lat":42.349662,
    "long":-71.063917
  },
  {
    "line":"Orange",
    "station":"Back Bay",
    "lat":42.34735,
    "long":-71.075727
  },
  {
    "line":"Orange",
    "station":"Mass Ave",
    "lat":42.341512,
    "long":-71.083423
  },
  {
    "line":"Orange",
    "station":"Ruggles",
    "lat":42.336377,
    "long":-71.088961
  },
  {
    "line":"Orange",
    "station":"Roxbury Crossing",
    "lat":42.331397,
    "long":-71.095451
  },
  {
    "line":"Orange",
    "station":"Jackson Square",
    "lat":42.323132,
    "long":-71.099592
  },
  {
    "line":"Orange",
    "station":"Stony Brook",
    "lat":42.317062,
    "long":-71.104248
  },
  {
    "line":"Orange",
    "station":"Green Street",
    "lat":42.310525,
    "long":-71.10741400000001
  },
  {
    "line":"Orange",
    "station":"Forest Hills",
    "lat":42.300523,
    "long":-71.113686
  },
  {
    "line":"Red",
    "station":"Alewife",
    "lat":42.395428,
    "long":-71.142483
  },
  {
    "line":"Red",
    "station":"Davis",
    "lat":42.39674,
    "long":-71.121815
  },
  {
    "line":"Red",
    "station":"Porter Square",
    "lat":42.3884,
    "long":-71.11914899999999
  },
  {
    "line":"Red",
    "station":"Harvard Square",
    "lat":42.373362,
    "long":-71.118956
  },
  {
    "line":"Red",
    "station":"Central Square",
    "lat":42.365486,
    "long":-71.103802
  },
  {
    "line":"Red",
    "station":"Kendall/MIT",
    "lat":42.36249079,
    "long":-71.08617653
  },
  {
    "line":"Red",
    "station":"Charles/MGH",
    "lat":42.361166,
    "long":-71.070628
  },
  {
    "line":"Red",
    "station":"Park Street",
    "lat":42.35639457,
    "long":-71.0624242
  },
  {
    "line":"Red",
    "station":"Downtown Crossing",
    "lat":42.355518,
    "long":-71.060225
  },
  {
    "line":"Red",
    "station":"South Station",
    "lat":42.352271,
    "long":-71.05524200000001
  },
  {
    "line":"Red",
    "station":"Broadway",
    "lat":42.342622,
    "long":-71.056967
  },
  {
    "line":"Red",
    "station":"Andrew",
    "lat":42.330154,
    "long":-71.057655
  },
  {
    "line":"Red",
    "station":"JFK/UMass",
    "lat":42.320685,
    "long":-71.052391
  },
  {
    "line":"Red",
    "station":"North Quincy",
    "lat":42.275275,
    "long":-71.029583
  },
  {
    "line":"Red",
    "station":"Wollaston",
    "lat":42.2665139,
    "long":-71.02033
  },
  {
    "line":"Red",
    "station":"Quincy Center",
    "lat":42.251809,
    "long":-71.005409
  },
  {
    "line":"Red",
    "station":"Quincy Adams",
    "lat":42.233391,
    "long":-71.007153
  },
  {
    "line":"Red",
    "station":"Braintree",
    "lat":42.2078543,
    "long":-71.0011385
  },
  {
    "line":"Red",
    "station":"Savin Hill",
    "lat":42.31129,
    "long":-71.053331
  },
  {
    "line":"Red",
    "station":"Fields Corner",
    "lat":42.300093,
    "long":-71.061667
  },
  {
    "line":"Red",
    "station":"Shawmut",
    "lat":42.29312583,
    "long":-71.06573796000001
  },
  {
    "line":"Red",
    "station":"Ashmont",
    "lat":42.284652,
    "long":-71.06448899999999
  },
];

        for (var i = stations.length - 1; i >= 0; i--) {
                if (stations[i].line == "Blue") {
                        blueLine.push(stations[i]);
                }
                else if (stations[i].line == "Orange") {
                        orangeLine.push(stations[i]);
                }
                else if (stations[i].line == "Red") {
                        redLine.push(stations[i]);

                        if (stations[i].station == "JFK/UMass" ||
                            stations[i].station == "Ashmont" || 
                            stations[i].station == "Shawmut" ||
                            stations[i].station == "Fields Corner" ||
                            stations[i].station == "Savin Hill" ) {
                                redLineFork.push(stations[i]);
                        }
                }   
        };

}

function getMyLocation()
{
        if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
                navigator.geolocation.getCurrentPosition(function(position) {
                        myLat = position.coords.latitude;
                        myLong = position.coords.longitude;
                        renderMap();
                });
        }
        else {
                alert("Geolocation is not supported by your web browser.");
        }
}

function renderMap()
{
        myLoc = new google.maps.LatLng(myLat, myLong);
        
        // Update map and go there...
        map.panTo(myLoc);

        // Create a marker
        marker = new google.maps.Marker({
                position: myLoc,
                title: "Current Location"
        });

        // Open info window on click of marker
        google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
        });

        google.maps.event.addListener(infowindow, 'content_changed', function() {
                infowindow.open(map, marker);
        })
                
        marker.setMap(map);

}

function dataReady()
{

        //Accounts for error from database
        if(mbta.status == 500) {
                alert("Something went wrong. The page will refresh.");
                location.reload();
        }

        if(mbta.readyState == 4) {
                scheduleData = JSON.parse(mbta.responseText);

                if(scheduleData.line == "blue") {
                        line = blueLine;
                        lineIcon = "markers/blueline.png";
                        lineColor = "#0000ff";
                }
                else if(scheduleData.line == "orange") {
                        line = orangeLine;
                        lineIcon = "markers/orangeline.png";
                        lineColor = "#ffa500";
                }
                else if(scheduleData.line == "red") {
                        line = redLine;
                        lineIcon = "markers/redline.png";
                        lineColor = "#ff0000";
                }


                displayStations(line); //blue, orange or red
                findClosestStation(line);
            
        }
}

function displayStations(lineToDisplay) 
{
        var pathCoords = [];
        var scheduleString = "";
     
        for (var i = lineToDisplay.length - 1; i >= 0; i--) {

                loc = new google.maps.LatLng(lineToDisplay[i].lat,
                                             lineToDisplay[i].long);

                st = new google.maps.Marker({
                        position: loc,
                        title: lineToDisplay[i].station,
                        icon: lineIcon
                });

                scheduleString = makeScheduleString(lineToDisplay[i].station);


                var info = new google.maps.InfoWindow();

                google.maps.event.addListener(st, 'click', function(content) {
    				return function(){
        				infowindow.setContent(content);//set the content
        				infowindow.open(map,this);
    				}
				}(scheduleString));


                st.setMap(map);


                //Getting coordinates for polyline
                pathloc = new google.maps.LatLng(lineToDisplay[i].lat, lineToDisplay[i].long);
                if (lineToDisplay[i].station != "Ashmont" && 
                    lineToDisplay[i].station != "Shawmut" && 
                    lineToDisplay[i].station != "Fields Corner" && 
                    lineToDisplay[i].station != "Savin Hill") {
                        pathCoords.push(pathloc);
                }
        };


        var linePath = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: lineColor,
                strokeOpacity: 1.0,
                strokeWeight: 4
        });

        linePath.setMap(map);

        /* Take care of fork in Red Line */

        if (lineToDisplay == redLine) {
                var forkCoords = [];
                for (var i = redLineFork.length - 1; i >= 0; i--) {
                        forkloc = new google.maps.LatLng(redLineFork[i].lat, 
                                                         redLineFork[i].long);
                        forkCoords.push(forkloc);

                };  

                var forkPath = new google.maps.Polyline({
                        path: forkCoords,
                        geodesic: true,
                        strokeColor: lineColor,
                        strokeOpacity: 1.0,
                        strokeWeight: 4
                });

                forkPath.setMap(map);  
        }

}

Number.prototype.toRad = function() {
           return this * Math.PI / 180;
        }



function findClosestStation(line) 
{

        //arbitrarily large for first number
        var closestDist = 100000000000000;
        var closestStation = "";

        //So that myLat and myLong are accurate
        navigator.geolocation.getCurrentPosition(function(position) {
                myLat = position.coords.latitude;
                myLong = position.coords.longitude;

                for (var i = line.length - 1; i >= 0; i--) {
                        var stLat = line[i].lat; 
                        var stLong = line[i].long; 


                        var R = 3963; // radius of Earth in miles

                        var x = stLat - myLat;
                        var y = stLong - myLong;

                        var dLat = x.toRad();  
                        var dLon = y.toRad();
         

                        var a = (Math.sin(dLat/2)) * (Math.sin(dLat/2)) + 
                                (Math.cos(myLat.toRad())) * (Math.cos(stLat.toRad())) * 
                                (Math.sin(dLon/2)) * (Math.sin(dLon/2));  

                        var c = 2 * (Math.atan2(Math.sqrt(a), (Math.sqrt(1-a)))); 
                        var d = R * c; 


                        if (d < closestDist) {
                                closestDist = d;
                                closestStation = line[i].station;
                        }
                };

                contentString = "<p><strong>Current Location</strong>\
                                 <br>Closest Station: " + 
                                 closestStation + "<br>Distance: " + 
                                 closestDist.toFixed(2) + " mi</p>";

        });
}

function makeScheduleString(stat)
{

	var str = "";
	var trip;
	var seconds;
	var dest;
	str += "<strong>" + stat + "</strong>\
			<table> \
			<tr> \
				<th>Line</th>\
				<th>Destination</th>\
				<th>Time Remaining</th>\
			</tr>";
				
	for (var i = scheduleData.schedule.length - 1; i >= 0; i--) {
		trip = scheduleData.schedule[i];
		for (var j = trip.Predictions.length - 1; j >= 0; j--) {
			if (trip.Predictions[j].Stop == stat) {
				seconds = trip.Predictions[j].Seconds;
				dest = trip.Destination;

				str += "<tr>\
							<td>" + capitaliseFirstLetter(scheduleData.line) + "</td>\
							<td>" + dest + "</td>\
							<td>" + toMin(seconds) + "</td>\
						</tr>";
			}		
		};
	};

	str += "</table>";
	return str;

}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toMin(sec)
{
	console.log(sec);
	var minutes = Math.floor(sec / 60);
	var seconds = sec - minutes * 60;

	var minString = "";

	if (minutes < 10) {
		minString += "0";
	}
	minString += minutes + ":"

	if (seconds < 10) {
		minString += "0";
	}
	minString += seconds;

	return minString;

}
