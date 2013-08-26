var OnionKnight = {};

jQuery(function($) {
    //gets the device width in em units
    OnionKnight.deviceWidth = function() {
        return $(window).width() / parseInt($("body").css("font-size"));
    };

    //checks that a device supports touch
    OnionKnight.isTouchDevice = ('ontouchstart' in window) // works on most browsers
            || navigator.msMaxTouchPoints; // works on ie10

    var width_tablet = 44;

    //nav top level links
    var nav_top_li = $('.nav__menu--depth-1 > .nav__item--parent');

    //mobile nav variables
    var nav_toggle = $(".nav__toggle");
    var nav = $(".nav__menu--depth-1");
    var navOpen = false;

    var closeMobileSubNav = function(e) {
        if (OnionKnight.deviceWidth() < width_tablet) {
            $('.nav__item--parent').find('.nav__menu--depth-2').hide();
        };
        $('.nav__item--parent').removeClass('nav__item--open');
    };

    var openMobileNav = function(e) {
        nav_toggle.addClass("nav__toggle--open");
        nav.slideDown(300);
        navOpen = true;
    };

    var closeMobileNav = function(e) {
        nav_toggle.removeClass("nav__toggle--open");
        closeMobileSubNav();
        nav.hide();
        navOpen = false;
    };

    //checks whether to close the mobile nav depending on where you mouse traverses
    var checkMobileNav = function(e) {
        if (OnionKnight.deviceWidth() < width_tablet) {
            var target = e.toElement || e.relatedTarget;

            var inside = $(target).closest('.nav__toggle, .nav__menu--depth-1').length;

            if (!inside) {
                closeMobileNav();
            };
        };
    };

    //touch version of mobile toggle
    var toggleMobileNav = function(e) {
        if (navOpen) {
            closeMobileNav();
        } else {
            openMobileNav();
        };
    };

    //toggle
    nav_toggle.on("touchstart", toggleMobileNav);

    //open
    nav_toggle.on("mouseenter", openMobileNav);

    //close
    nav_toggle.on("mouseleave", checkMobileNav);
    nav.on("mouseleave", checkMobileNav);

    //mobile subnav toggle
    var toggleSubNav = function() {
        var target = $(this);

        if (OnionKnight.deviceWidth() < width_tablet) {
            //close all other open subnavs to maintain dropdown height (and thus, usability)
            $('.nav__item--parent').not(target).find('.nav__menu--depth-2').slideUp(200);
            //show subnav
            target.find('.nav__menu--depth-2').slideDown(200);
            target.addClass('nav__item--open');
            $('.nav__item--parent').not(target).removeClass('nav__item--open');
        } else {
            target.toggleClass('nav__item--open');
        };
    };

    //mobile sub nav toggle - on touch devices
    var touchSubNav = function(e) {
        //if menu is closed then prevent navigation
        if (!$(this).is('.nav__item--open.nav__item--parent')) {
            e.preventDefault();
        };
        //opens subnav (will only ever open it - the above 'if' will navigate away when it's already open)
        toggleSubNav.call(this);
    };

    //close any dropdowns on touching other elements
    $('body').on('touchstart', function(e) {
        if (OnionKnight.deviceWidth() > width_tablet) {
            //close *all* dropdowns
            nav_top_li.removeClass('nav__item--open');
            //keep current dropdown open ... could we write this better by combining this with the above line?
            $(e.target).closest('.nav__item--parent').addClass('nav__item--open');

            //close search unless it is being touched
            if (!$(e.target).closest('.search-open').length) {
                $('.search-open').removeClass('search-open');
            };
        };
    });

    if (!OnionKnight.isTouchDevice) {
        nav_top_li.on('mouseenter', toggleSubNav);
        nav_top_li.on('mouseleave', toggleSubNav);
    };

    nav_top_li.on('touchstart', touchSubNav);
});
