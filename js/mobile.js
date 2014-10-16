$(document).ready(function(){

$(window).resize(function() {
        if ($(window).width() > 800) {
                $("nav ul").show();
        } else {
                $("nav ul").hide();
        }
});

$(".navicon").click(function() {
    //need the following to toggle
    $("nav ul").slideToggle();    
});


$("html").click(function (event) { 
    if(!$(event.target).closest('.navicon').length) {
        if($("nav ul").is(":visible") && $(window).width() < 800) {
            $("nav ul").slideUp();
        }
    }        
});



});