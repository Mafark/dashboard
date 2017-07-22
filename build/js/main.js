'use strict';
$(document).ready(function() {
  // load line chart
  // google.charts.load('current', { packages: ['corechart', 'line'] });

  // load initial content
  $.pjax({ url: '../content/serverState.html', container: '.content' });

  preloaderToggle(false);
});

// menu initialization
$(document).pjax('a', '.content');

// event on load content
$(document).on('ready pjax:end', function(event) {
  $.event.trigger('changeUrl', { foo: 1 });
});

var CONSTANT = {
  site: ''
};
$(window).on('changeUrl', function(event, data) {
  if (location.pathname === '/content/serverState.html') {
    var labels = ['02:04:33', '02:04:35', '02:04:40'];
    var data = [10, 20, 30];
    pasteLineChart('#chart_fps', 'fps', labels, data);
    pasteLineChart('#chart_traffic', 'traffic', labels, data);
  }
});

var pasteLineChart = function(selector, label, labels, data) {
  var ctx = $(selector);
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          borderColor: 'rgb(235,89,55)',
          borderWidth: 1,
          lineTension: 0,
          data: data
        }
      ]
    },

    // Configuration options go here
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: 'nearest',
        intersect: false,
        backgroundColor: 'rgb(28, 25, 25, 0.8)',
        titleFontFamily: 'Roboto',
        bodyFontFamily: 'Roboto',
        footerFontFamily: 'Roboto',
        displayColors: false
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              maxRotation: 0
            }
          }
        ]
      }
    }
  });
};

$(window).on('changeUrl', function(event, data) {
  svgReplace();
});

var svgReplace = function(params) {
  jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(
      imgURL,
      function(data) {
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
      },
      'xml'
    );
  });
};
svgReplace();

(function($) {
  var sidebar = $('.sidebar');
  var menuToggle = $('.menu-toggle');

  menuToggle.click(function() {
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
