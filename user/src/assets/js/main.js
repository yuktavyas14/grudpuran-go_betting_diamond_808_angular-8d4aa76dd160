$(window).scroll(function() {
    var sticky = $('.main-navbar'),
      scroll = $(window).scrollTop();
  
    if (scroll >= 50) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });