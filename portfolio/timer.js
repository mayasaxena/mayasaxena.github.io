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
    checkAnswers(correctAnswers);
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

function checkAnswers(correctAnswers) {
    var values = [];
    if (localStorage.page == 1) {
        values = $('#items').val();

    } else if (localStorage.page == 2) {
        $('#items input:checked').each(function() {
            values.push($(this).val());
        });
    }

    console.log(values);

}