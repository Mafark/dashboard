(function($) {
  $.fn.initializeMenu = function(menuSelector, contentSelector, part, callback) {
    $(menuSelector + ' li a').click(function() {
      var link = CONSTANT.site + $(this).attr('href');
      $().getContent(contentSelector, link, part, callback);
      $(menuSelector + ' li').removeClass('active');
      $(this).parent().addClass('active');
      history.pushState('', '', link);
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
      $(contentSelector).load(newLink, function() {
        preloaderToggle(false);
        callback ? callback() : null;
        $(contentSelector).fadeIn('fast');
      });
    });
  };

  // var insertContent = function (contentSelector, htmlContent) {
  //   $(contentSelector).html(htmlContent)
  // }

  // var getTab = function (contentName, contentDataUrl, callback) {
  //   var response = {
  //     content: null,
  //     data: null
  //   };
  //   ajax.getTabContent(contentName).then(function (htmlContent) {
  //     response.content = htmlContent;
  //     (response.data) {
  //       callback();
  //       return response;
  //     } : null;
  //   })
  //   ajax.getTabData(contentDataUrl).then(function (data) { //server/1
  //     response.data = data;
  //     (response.content) {
  //       callback();
  //       return response;
  //     } : null;
  //   })
  // }
})(jQuery);
