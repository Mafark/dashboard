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

//dropdown toggle
(function() {
  $('.dropdown-tab').children('a').click(function(params) {
    $(this).siblings('ul').slideToggle('medium');
  });
})();

//replace active class
(function() {
  var links = $('.sidebar-menu a[href]');
  links.click(function(event) {
    links.each(function(index, link) {
      $(link).parent('li').removeClass('active');
    });
    $(this).parent('li').addClass('active');
  });
})();
