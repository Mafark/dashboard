$(document).ready(function () {
  $('.h-name-container').removeClass('hidden');
  $('.h-name-char').removeClass('h-name-char-hidden');
  $('.h-profession').removeClass('h-profession-hidden');
});

$(window).scroll(function () {
  var gearDeg = $(this).scrollTop();
  $('.gear-1').css({
    'transform': ' translateX(-110%) rotate(' + gearDeg/5 + 'deg)'
  });
  $('.gear-2').css({
    'transform': ' translateX(-10%) rotate(-' + gearDeg/5 + 'deg)'
  });
  $('.gear-3').css({
    'transform': ' translateX(-110%) rotate(' + gearDeg/5 + 'deg)'
  });
  $('.gear-4').css({
    'transform': ' translateX(110%) rotate(-' + gearDeg/5 + 'deg)'
  });
  $('.gear-5').css({
    'transform': ' translateX(10%) rotate(' + gearDeg/5 + 'deg)'
  });
  $('.gear-6').css({
    'transform': ' translateX(110%) rotate(-' + gearDeg/5 + 'deg)'
  });
});