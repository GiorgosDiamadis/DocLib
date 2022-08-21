$(document).ready(function (e) {
    var $carousel = $('#carouselExampleIndicators');
    $carousel.carousel();
    var handled = false;//global variable

    $carousel.bind('slide.bs.carousel', function (e) {
        console.log(e)
        var current = $(e.target).find('.carousel-item.active');
        var indx = $(current).index();
        if ((indx + 2) > $('.carousel-indicators button').length)
            indx = -1
        if (!handled) {
            $('.carousel-indicators button').removeClass('active')
            $('.carousel-indicators button:nth-child(' + (indx + 2) + ')').addClass('active');
        } else {
            handled = !handled;//if handled=true make it back to false to work normally.
        }
    });

    $(".carousel-indicators button").on('click', function () {
        //Click event for indicators
        $(this).addClass('active').siblings().removeClass('active');
        //remove siblings active class and add it to current clicked item
        handled = true; //set global variable to true to identify whether indicator changing was handled or not.
    });
})