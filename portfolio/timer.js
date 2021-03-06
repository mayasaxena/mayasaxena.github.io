var clicked = false;
var sec = 0.0;

function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 100);
        clicked = true;
        var form = document.getElementById("items");
        if (form.disabled) {
            form.disabled = false;
        } else {
            for (var i = form.children.length - 1; i >= 0; i--) {
                for (var j = form.children[i].children.length - 1; j >= 0; j--) {
                    form.children[i].children[j].disabled = false;
                };
            };
        }
    }
    else if (clicked === true) {
    }
}

function stopWatch() {
    sec+= .1;

}

function stopClock(correctAnswers) {
    window.clearInterval(clock);
    if (checkAnswers(correctAnswers)) {

        sessionStorage.setItem("Trial " + sessionStorage.trial + " page " + sessionStorage.page, Math.round(sec * 10) / 10);

        if (sessionStorage.trial == 8 && sessionStorage.page == 2) {
            window.location.href = "done.html";

        }  else {
            if (sessionStorage.page == 2) {
                sessionStorage.setItem("trial", (parseInt(sessionStorage.trial) + 1));
                sessionStorage.setItem("page", 1);
            } else if (sessionStorage.page == 1) {
                sessionStorage.setItem("page", 2);
            }
            sec = 0.0;
            clicked = false;
            window.location.href = "trial" + sessionStorage.trial + "p" + sessionStorage.page + ".html";
        } 
    }

}

function checkAnswers(correctAnswers) {
    var values = [];
    if (sessionStorage.page == 1) {
        values = $('#items').val();

    } else if (sessionStorage.page == 2) {
        $('#items input:checked').each(function() {
            values.push($(this).attr('name'));
        });
    }

    if (!values.equals(correctAnswers)) {
        alert("Incorrect items chosen");
        // console.log("answers: " + values);
        // console.log("correctAnswers: " + correctAnswers);
        if (sessionStorage.getItem("errorCount") == null) {
            sessionStorage.setItem("errorCount", 1);
        } else {
            sessionStorage.setItem("errorCount", (parseInt(sessionStorage.errorCount) + 1));
            
        }
        location.reload();
        return false;
    } else {
        return true;
    }

}


Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}  

