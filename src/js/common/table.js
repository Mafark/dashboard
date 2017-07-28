(function() {
  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverPlayers.html') {
      $.ajax({
        url: 'http://a-life.online/api/players',
        success: function(data) {
          console.log(data);
          // $('.sidebar').html(data);
          // menuInit();
        }
      });
      createAjaxTable('#table-player', '#table-loader', 'http://a-life.online/api/players');
    }
  });
})();

var createAjaxTable = function(tableSelector, preloaderSelector, url) {
  var nextPageLink = null;
  var columnsNames = null;
  $(preloaderSelector).show();
  $.ajax({
    url: nextPageLink ? nextPageLink : url,
    success: function(response) {
      if (response) {
        $(tableSelector).append('<thead></thead><tbody></tbody>');
        columnsNames = Object.keys(response.Items[0]);
        nextPageLink = response.NextPageLink;
        fillTableHeader(columnsNames);
        fillTableBody(response.Items, columnsNames);
        $(preloaderSelector).hide();
      } else {
        $(preloaderSelector).html('<center>No more posts to show.</center>');
      }
    }
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      $(preloaderSelector).show();
      $.ajax({
        url: nextPageLink ? nextPageLink : url,
        success: function(response) {
          if (response) {
            nextPageLink = response.NextPageLink;
            fillTableBody(response.Items, columnsNames);
            $(preloaderSelector).hide();
          } else {
            $(preloaderSelector).html('<center>No more posts to show.</center>');
          }
        }
      });
    }
  });

  var fillTableHeader = function(columnsNames) {
    var tableHead = '';
    columnsNames.forEach(function(column) {
      tableHead += '<th>' + column + '</th>';
    });
    $(tableSelector + ' thead').append(tableHead);
  };

  var fillTableBody = function(data, columnsNames) {
    var tableBody = '';

    data.forEach(function(item) {
      tableBody += '<tr>';
      columnsNames.forEach(function(column) {
        tableBody += '<td>' + item[column] + '</td>';
      });
      tableBody += '</tr>';
    });
    $(tableSelector + ' tbody').append(tableBody);
  };
};
