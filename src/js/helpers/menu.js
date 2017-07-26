//menu toggle
(function() {
  var sidebar = $('.sidebar');
  var menuToggle = $('.menu-toggle');

  menuToggle.click(function() {
    if (sidebar.hasClass('menu-hidden')) {
      sidebar.removeClass('menu-hidden');
    } else {
      sidebar.addClass('menu-hidden');
    }
  });
})();

(function() {
  $('.dropdown-tab').children('a').click(function(params) {
    $(this).siblings('ul').slideToggle('slow');
  });
})();
