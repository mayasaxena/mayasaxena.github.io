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
var stations;


function init() {
        mbta = new XMLHttpRequest();
        mbta.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
        request = new XMLHttpRequest();
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        getMyLocation();


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
        marker.setMap(map);
                
}