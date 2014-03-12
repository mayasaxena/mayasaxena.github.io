var xhr;
function init() {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);

        xhr.onreadystatechange = dataReady; //rval has to be a function
        xhr.send(null);
}

function dataReady() {

        if(xhr.readyState  == 4) {
                schedule = JSON.parse(xhr.responseText);
                console.log(schedule);
                scheduleDOM = document.getElementById("schedule");
                scheduleDOM.innerHTML = schedule["line"];
        }
}