(function($) {
  $.fn.initializeMenu = function(menuSelector, contentSelector, firstContent, callback) {
    getContent(contentSelector, firstContent);
    $(menuSelector + ' li a').click(function() {
      var link = CONSTANT.site + $(this).attr('href');
      getContent(contentSelector, link);
      $(menuSelector + ' li').removeClass('active');
      $(this).parent().addClass('active');
      callback ? callback() : null;
      history.pushState('', '', link);
      return false;
    });
  };

  var getContent = function(contentSelector, link) {
    preloaderToggle();
    setTimeout(function() { //DELETE timeout
      $(contentSelector).fadeOut('fast', function() {
        $(contentSelector).load(link, function() {
          preloaderToggle();
          $(contentSelector).fadeIn('fast');
        });
      });
    }, 2000);
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
