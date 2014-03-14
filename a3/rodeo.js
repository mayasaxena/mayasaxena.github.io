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
var line;
var stationstr;
var stations;
var redLine = [];
var orangeLine = [];
var blueLine = [];
var schedule;

function init() {
        mbta = new XMLHttpRequest();
        mbta.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
        request = new XMLHttpRequest();
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        getMyLocation();
        readStations();
        mbta.onreadystatechange = dataReady; //rval has to be a function
        mbta.send(null);

}

function readStations()
{
    stations = JSON.parse("stations.json");

    if(stations[i][0] == "Blue") {
        blueLine.push(stations[i]);
    }
    else if(stations[i][0] == "Orange") {
        orangeLine.push(stations[i]);
    }
    else if(stations[i][0] == "Red") {
        redLine.push(stations[i]);
    }
    
    console.log(stations[0]);

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
                infowindow.setContent(marker.title);
                infowindow.open(map, marker);
        });
                
        marker.setMap(map);

}

function dataReady() {
        if(mbta.status == 500) {
            alert("Something went wrong. Refreshing...")
            location.reload();
        }
        if(mbta.readyState == 4) {

                schedule = JSON.parse(mbta.responseText);

                if (schedule["line"] == "blue") {

                }
                else if (schedule["line"] == "orange") {

                }
                else if (schedule["line"] == "red") {

                }
        }

}
