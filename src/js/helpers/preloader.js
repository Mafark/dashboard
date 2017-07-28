var preloaderToggle = function(on) {
  var preloader = $('.preloader');
  var hideClass = 'h';
  if (on) {
    preloader.hasClass(hideClass) ? preloader.removeClass(hideClass) : null;
  } else {
    preloader.hasClass(hideClass) ? null : preloader.addClass(hideClass);
  }
};

$(document).on('pjax:start', function(event) {
  preloaderToggle(true);
});

$(document).on('ready pjax:end', function(event) {
  preloaderToggle(false);
});
