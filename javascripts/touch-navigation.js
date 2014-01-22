var OnionKnight = {};

jQuery(function($) {
    //gets the device width in em units
    OnionKnight.deviceWidth = function() {
        return $(window).width() / parseInt($("body").css("font-size"));
    }

    //checks that a device supports touch
    OnionKnight.isTouchDevice = ("ontouchstart" in window) || navigator.msMaxTouchPoints;
    OnionKnight.isLegacyIE = !!$('.no-mediaqueries').length;

    //"wide" device width (aka OnionKnight 'large' breakpoint)
    var wide_device = 58.3125;

    //dom variables
    var nav_top_li = $('.nav--main .nav__menu--depth-1 > .nav__item--parent');
    var nav_toggle = $('.xsb-header-nav .nav__toggle');
    var nav = $('.xsb-header-nav .nav');
    var nav_parent = $('.xsb-header-nav .nav__item--parent');
    var dropdown = $('.xsb-header-nav .nav__menu--depth-2');

    //menu states
    var nav_open = false;
    var toggle_text = nav_toggle.text();
    var subtoggle_text = nav_toggle.text();

    // toggle mobile nav
    nav_toggle.click(function(){
        nav.toggle();

        if( nav_open == false ) {
            nav_toggle.text('Hide Menu');
            nav_open = true;
        } else {
            nav_toggle.text(toggle_text);
            nav_open = false;
        }
    });

    //Close the navigation when clicked outside
    $('html').on('click touchstart', function() {

        if( nav_open == true ) {
            nav.toggle();
            nav_toggle.text(toggle_text);
            nav_open = false;
        } else {
            //do nothing
        }
    });
    $('.xsb-header-nav').on('click touchstart', function(event){
        event.stopPropagation();
    });

    //support touch events
    // if (OnionKnight.deviceWidth() <= wide_device) {
    // Add a <span> to every nav_parent
    nav_parent.prepend('<span class="nav__sub-toggle">+</span>');
    // var subtoggle_text = $('.nav__sub-toggle').text();

    // Dynamic binding to on 'click'
    nav_parent.on('click', '.nav__sub-toggle', function(){
        //check the viewport is less than the mobile breakpoint
        if (OnionKnight.deviceWidth() <= wide_device) {

            // Toggle the nested nav
            $(this).siblings('.nav__menu--depth-2').slideToggle(200);

            // Toggle the arrow using CSS3 transforms
            if($(this).text() == '+') {
                $(this).text('-');
            } else {
                $(this).text('+');
            }
        }
    });
});
