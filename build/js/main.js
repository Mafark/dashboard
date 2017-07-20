'use strict';
$(document).ready(function() {
  $().getContent('.sidebar-tabs-content', '../content/serverState.html', null, function() {
    $().initializeMenu('.server-tabs', '.server-tabs-content', '.server-tabs-content');
  });
  $().initializeMenu('.sidebar-tabs', '.sidebar-tabs-content');
});

var CONSTANT = {
  site: ''
};
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

(function($) {
  var sidebar = $('.sidebar');
  var menuToggle = $('.menu-toggle');

  menuToggle.click(function () {
    preloaderToggle();
    if (sidebar.hasClass('menu-hidden')) {
      sidebar.removeClass('menu-hidden');
    } else {
      sidebar.addClass('menu-hidden');
    }
  });
})(jQuery);

var preloaderToggle = function(on) {
  var preloader = $('.preloader');
  var hideClass = 'h';
  if (on) {
    preloader.hasClass(hideClass) ? preloader.removeClass(hideClass) : null;
  } else {
    preloader.hasClass(hideClass) ? null : preloader.addClass(hideClass);
  }
};

var svgReplace = function (params) {
  jQuery('img.svg').each(function () {
    var $img = jQuery(this)
    var imgID = $img.attr('id')
    var imgClass = $img.attr('class')
    var imgURL = $img.attr('src')

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg')

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID)
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg')
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a')

      // Replace image with new SVG
      $img.replaceWith($svg)
    }, 'xml')
  })
}
svgReplace()
