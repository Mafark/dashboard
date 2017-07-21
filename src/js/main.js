'use strict';
$(document).ready(function() {
  $.pjax({ url: '../content/serverState.html', container: '.content' });
  preloaderToggle(false);
});

$(document).pjax('a', '.content');
