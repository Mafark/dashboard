'use strict';

$(document).ready(function () {
  //svg replace
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');
  });

  $('.server').load('../content/sidebar/server.html');
  // $('.sidebar-tabs').lightTabs('.sidebar-tabs-content', 0)
  // $('.server-tabs').lightTabs('.server-tabs-content', 0)
})

//menu-toggle
!function ($) {
  var sidebar = $('.sidebar');
  var menuToggle = $('.menu-toggle');

  menuToggle.click(function () {
    if (sidebar.hasClass('menu-hidden')) {
      sidebar.removeClass('menu-hidden');
    } else {
      sidebar.addClass('menu-hidden');
    }
  })
}(jQuery)

//tabs plugin
!function ($) {
  jQuery.fn.lightTabs = function (contentSelector, numberOfActive) {
    var createTabs = function () {
      var tabs = this;
      var i = 0;

      var showPage = function (selector) {
        $(contentSelector).children("div").hide();
        $(contentSelector).children(selector).show();
        $(tabs).children("li").removeClass("active");
        $(tabs).children("li:has(a[href='" + selector + "'])").addClass("active");
      }

      showPage($(tabs).children("li:eq("+ numberOfActive +")").children('a').attr("href"));

      $(tabs).children("li").click(function (e) {
        e.preventDefault();
        showPage($(this).children('a').attr("href"));
      });
    };
    return this.each(createTabs);
  };
}(jQuery);