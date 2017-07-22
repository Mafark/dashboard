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
