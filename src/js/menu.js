(function($) {
  $.fn.initializeMenu = function(menuSelector, contentSelector, path, firstTab, callback) {
    $(contentSelector).load(path + firstTab + '.html');
    $(menuSelector + ' li a').click(function() {
      var linkName = $(this).attr('href');
      var link = path + linkName + '.html';
      $(contentSelector).load(link);
      $(menuSelector + ' li').removeClass('active');
      $(this).parent().addClass('active');
      callback ? callback() : null;
      return false;
    });
  };
})(jQuery);
