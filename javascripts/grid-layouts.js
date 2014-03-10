(function($) {
    // Default Onionknight/Siegmeyer grid variables
    // MUST match base/variables grid variable values to work correctly, in ems. Omit the em units here
    var col_width = 3.7;
    var gutter_width = 1;

    //point where prefabs will adopt various breakpoint styles
    var cols = {
        xsml: 4,
        sml: 6,
        med: 9,
        lrg: 12
    }

    // base font size used to calculate pixel widths from ems
    var font_size = parseInt($('body').css('font-size'));

    // calculate pixel widths for column and gutter
    col_width *= font_size;
    gutter_width *= font_size;

    // calculate total width for given cols value
    var widths = {};
    for (var size in cols) {
        widths[size] = cols[size] * (col_width + gutter_width) - gutter_width - 1;
        console.log("px-width " + cols[size] + ": " + widths[size]);
    }

    var testGridWidths = function(e) {
        $('.xsb-col').each(function(e) {
            var current_width = $(this).outerWidth();
            for (var size in widths) {

                if (current_width > widths[size]) {
                    $(this).addClass('xsb-col--gt-' + size);
                } else {
                    $(this).removeClass('xsb-col--gt-' + size);
                }
            }
        });
    }

    var timer;

    $(window).on('resize', function(e) {
        if (timer !== null) {
           clearTimeout(timer);
       }
       timer = setTimeout(testGridWidths, 100);
    });

    testGridWidths();
})(jQuery);