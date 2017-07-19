'use strict';
$(document).ready(function() {
  $('.server').load('../content/sidebarMenu/server.html');
  $().initializeMenu('.sidebar-tabs', '.sidebar-tabs-content', '../content/sidebarMenu/', 'server');
  preloaderToggle();
});
