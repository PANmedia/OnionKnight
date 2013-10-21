var OnionKnight = {};

jQuery(function($) {
    //gets the device width in em units
    OnionKnight.deviceWidth = function() {
        return $(window).width() / parseInt($("body").css("font-size"));
    }

    //checks that a device supports touch
    OnionKnight.isTouchDevice = ("ontouchstart" in window) || navigator.msMaxTouchPoints;

    //tablet width
    var width_tablet = 46.9375;

    //dom variables
    var nav_top_li = $('.nav--main .nav__menu--depth-1 > .nav__item--parent');
    var nav_toggle = $('.xsb-header-nav .nav__toggle');
    var nav = $('.xsb-header-nav .nav__menu--depth-1');
    var nav_parent = $('.xsb-header-nav .nav__item--parent');
    var dropdown = $('.xsb-header-nav .nav__menu--depth-2');

    //menu states
    var nav_open = false;
    var mobile_nav_open = false;


    //====================================
    //-------------- MOBILE --------------
    //====================================

    var closeMobileSubNav = function(e) {
        if (OnionKnight.deviceWidth() <= width_tablet) {
            nav_parent.find('.nav__menu--depth-2').hide();
        };
        nav_parent.removeClass('nav__item--open');
    };

    var openMobileNav = function(e) {
        nav_toggle.addClass("nav__toggle--open");
        nav.slideDown(300);
        mobile_nav_open = true;
    };

    var closeMobileNav = function(e) {
        nav_toggle.removeClass("nav__toggle--open");
        closeMobileSubNav();
        nav.hide();
        mobile_nav_open = false;
    };

    //checks whether to close the mobile nav depending on where your mouse traverses
    var checkMobileNav = function(e) {
        if (OnionKnight.deviceWidth() <= width_tablet) {
            var target = e.toElement || e.relatedTarget;

            var inside = $(target).closest('.nav__toggle, .nav__menu--depth-1').length;

            if (!inside) {
                closeMobileNav();
            };
        };
    };

    //touch version of mobile toggle
    var toggleMobileNav = function(e) {
        if (nav_open) {
            closeMobileNav();
        } else {
            openMobileNav();
        };
    };


    //====================================
    //------------ DROPDOWNS -------------
    //====================================

    //show dropdowns
    var setDropdowns = function() {
        //physically show dropdowns (do NOT set variables), eg:
        // unsetDropdowns();

        //se height based on li count & heights
        // $(this).find(".nav__menu--depth-2").each(function() {
        //     var sublinkCount = $(this).find(".nav__item").length;
        //     var sublinkHeight = $(this).find(".nav__item:first-child").outerHeight();

        //     $(this).css("height", sublinkCount * sublinkHeight + 2);
        // });
    };


    //remove dropdowns
    var unsetDropdowns = function() {
        if (OnionKnight.deviceWidth() > width_tablet) {
            //physically hide dropdowns (do NOT set variables), eg:
            //dropdown.css("height", "0");
        }
    }


    //generic nav toggle
    var toggleSubNav = function() {
        var target = $(this);

        if (OnionKnight.deviceWidth() <= width_tablet) {
            mobSubNav(target);
        } else {
            resetDropdowns(target);

            //remove other open classes and add open class to target if not already open
            if (!nav_open) {
                setDropdowns.call(this);
                target.addClass('nav__item--open');
            }
        };
    };


    //mouse nav open
    var closeSubNav = function() {
        var target = $(this);

        if (OnionKnight.deviceWidth() > width_tablet) {
            resetDropdowns(target);
        };
    };


    //mouse nav close
    var openSubNav = function() {
        var target = $(this);

        if (OnionKnight.deviceWidth() > width_tablet) {
            resetDropdowns(target);

            setDropdowns.call(this);
            target.addClass('nav__item--open');
        };
    };


    //toggles sub nav on mobile
    var mobSubNav = function(target) {
        //close all other open subnavs to maintain dropdown height (and thus, usability)
        nav_parent.not(target).find('.nav__menu--depth-2').slideUp(500);
        //show subnav
        target.find('.nav__menu--depth-2').css({ "margin-left": "", "height": "" }).slideDown(500);
        target.addClass('nav__item--open');
        nav_parent.not(target).removeClass('nav__item--open');
    }


    //closes dropdowns & prepares them to be opened/closed
    var resetDropdowns = function(target) {
        setDropdownMargins();

        //check if dropdowns are open
        if ($(target).closest('.nav__item--open').length) {
            nav_open = true;
        } else {
            nav_open = false;
        }
        unsetDropdowns();
        nav_top_li.removeClass('nav__item--open');
    }


    //sub nav toggle on touch devices
    var touchSubNav = function(e) {
        //if menu isn't open then prevent navigation
        if (!$(this).closest('.nav__menu--depth-2').length) {
            if (!$(this).closest('.nav__item--open').length) {
                e.preventDefault();
                toggleSubNav.call(this);
            }
        }
    };


    //====================================
    //---------- EVENT BINDING -----------
    //====================================

    if (OnionKnight.isTouchDevice) {
        //touch class
        $('body').addClass('touch');

        //touch toggle
        nav_top_li.on('touchstart', touchSubNav);

        nav_toggle.on("touchstart", toggleMobileNav);
    } else {

        //Dropdowns - mouse toggles
        nav_top_li.on('mouseenter', openSubNav);
        nav_top_li.on('mouseleave', closeSubNav);

        //Dropdowns - mobile mouse toggle
        nav_top_li.on('click', touchSubNav);

        //mobile nav - mouse open
        nav_toggle.on("mouseenter", openMobileNav);

        //mobile nav - mouse close
        nav_toggle.on("mouseleave", checkMobileNav);
        nav.on("mouseleave", checkMobileNav);
    }

    //close any dropdowns on touching other elements
    $('.touch').on('touchstart', function(e) {
        if (OnionKnight.deviceWidth() > width_tablet) {

            //close *all* dropdowns, unless a dropdown anchor is being clicked
            var body_clicked = setTimeout(function() {
                if (!$(e.target).is('.nav__item, .nav__item *')) {
                    toggleSubNav.call('.nav__item--open');
                }
            },5);
        };
    });
});
