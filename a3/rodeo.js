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


function init() {
        mbta = new XMLHttpRequest();
        mbta.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
        request = new XMLHttpRequest();
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        getMyLocation();
        readCSV("stations.csv");

        mbta.onreadystatechange = dataReady; //rval has to be a function
        mbta.send(null);

}

function readCSV(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
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

        if(mbta.readyState == 4) {
                schedule = JSON.parse(mbta.responseText);
        }
}
