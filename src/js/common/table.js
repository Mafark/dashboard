(function() {
  var records = [
    {
      band: 'Weezer',
      song: 'El Scorcho'
    },
    {
      band: 'Chevelle',
      song: 'Family System'
    }
  ];
  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverPlayers.html') {
      $('#my-final-table').dynatable({
        dataset: {
          records: records
        }
      });
    }
  });
})();
