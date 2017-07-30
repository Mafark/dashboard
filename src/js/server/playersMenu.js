(function() {
  $(window).on('changeUrl', function() {
    if (location.pathname === '/content/serverPlayers.html') {
      initUpperButtonsMenu();
    }
  });

  var initUpperButtonsMenu = function() {
    var $buttons = $('.upper-switch-buttons').children('div').children('button');
    $buttons.click(function() {
      $buttons.each(function(index, button) {
        $(button).removeClass('active');
      });
      $(this).addClass('active');
    });
  };
})();
