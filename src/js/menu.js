(function($) {
  $.fn.initializeMenu = function(menuSelector, contentSelector, part, callback) {
    $('body').on('click', menuSelector + ' li a', function() {
      var link = CONSTANT.site + $(this).attr('href');
      $().getContent(contentSelector, link, part, callback);
      $(menuSelector + ' li').removeClass('active');
      $(this).parent().addClass('active');
      return false;
    });
  };

  $.fn.getContent = function(contentSelector, link, part, callback) {
    var newLink;
    if (part) {
      newLink = link + ' ' + part;
    } else {
      newLink = link;
    }
    preloaderToggle(true);
    $(contentSelector).fadeOut('fast', function() {
      try {
        $(contentSelector).load(newLink, function() {
          preloaderToggle(false);
          callback ? callback() : null;
          $(contentSelector).fadeIn('fast');
        });
      } catch (e) {
        preloaderToggle(false);
        callback ? callback() : null;
        $(contentSelector).fadeIn('fast');
        console.log(e);
      }
    });
  };
})(jQuery);
