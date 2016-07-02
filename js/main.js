$( document ).ready(function(){
    /* sidebar mobile */
    $(".button-collapse").sideNav();

    $('.page-scroll a').click(function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
