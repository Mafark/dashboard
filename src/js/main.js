'use strict';
$(document).ready(function() {
  // load sidebar
  $.ajax({
    url: 'http://a-life.online/Dashboard/Servers',
    success: function(data) {
      // $('.sidebar').html(data);
      // menuInit();
    }
  });
  menuInit(); //dell

  // load initial content
  location.pathname === '/' ? $.pjax({ url: '../content/serverState.html', container: '.content' }) : null;
});

// menu initialization
$(document).pjax('a', '.content');

// event on load content
$(document).on('ready pjax:end', function(event) {
  $.event.trigger('changeUrl');
});
