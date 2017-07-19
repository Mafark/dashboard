var preloaderToggle = function() {
  var preloader = $('.preloader');
  var hideClass = 'h';
  preloader.hasClass(hideClass) ? preloader.removeClass(hideClass) : preloader.addClass(hideClass);
};
