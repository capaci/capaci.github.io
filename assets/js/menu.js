$(document).ready(function() {
    var menuLinks = $('.sub-menu__item--link');
    var firstMenuLink = menuLinks[0];
    var lastMenuLink = menuLinks[menuLinks.length - 1];

	$(document).delegate('.open', 'click', function(event){
		$(this).addClass('oppenned');
		event.stopPropagation();
	})
	$(document).delegate('body', 'click', function(event) {
		$('.open').removeClass('oppenned');
	})
	$(document).delegate('.cls', 'click', function(event){
		$('.open').removeClass('oppenned');
		event.stopPropagation();
	});

    /* show menu when user focused on a menu link using the keyboard */
    $(document).delegate('.sub-menu__item--link', 'focus', function(event){
		$('.open').addClass('oppenned');
		event.stopPropagation();
	})

    /* hide menu when user get out of menu links using the keyboard */
    $(document).delegate('.sub-menu__item--link', 'focusout', function(event){
        if (this === lastMenuLink || this === firstMenuLink) {
            $('.open').removeClass('oppenned');
        }
		event.stopPropagation();
	})
});
