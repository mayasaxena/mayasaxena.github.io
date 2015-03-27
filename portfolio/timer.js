var clicked = false;
var sec = 0.0;

function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 100);
        clicked = true;
    }
    else if (clicked === true) {
    }
}

function stopWatch() {
    sec+= .1;

}

function stopClock() {
    window.clearInterval(clock);
    localStorage.setItem("Trial " + localStorage.trial + " page " + localStorage.page, Math.round(sec * 10) / 10);

    if (localStorage.trial == 8 && localStorage.page == 2) {
        window.location.href = "done.html";

    }  else {
        if (localStorage.page == 2) {
            localStorage.setItem("trial", (parseInt(localStorage.trial) + 1));
            localStorage.setItem("page", 1);
        } else if (localStorage.page == 1) {
            localStorage.setItem("page", 2);
        }
        sec = 0.0;
        clicked = false;
        window.location.href = "trial" + localStorage.trial + "p" + localStorage.page + ".html";
    } 

}