'use strict';
$(document).ready(function() {
  // load line chart
  // google.charts.load('current', { packages: ['corechart', 'line'] });

  // load initial content
  location.pathname === '/' ? $.pjax({ url: '../content/serverState.html', container: '.content' }) : null;
  $.event.trigger('changeUrl');

  preloaderToggle(false);
});

// menu initialization
$(document).pjax('a', '.content');

// event on load content
$(document).on('ready pjax:end', function(event) {
  $.event.trigger('changeUrl');
});
