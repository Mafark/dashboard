'use strict';
$(document).ready(function() {
  $().getContent('.sidebar-tabs-content', '../content/serverState.html', null);
  $().initializeMenu('.server-tabs', '.server-tabs-content', '.server-tabs-content');
  $().initializeMenu('.sidebar-tabs', '.sidebar-tabs-content');
});
