(function() {
  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverPlayers.html') {
      createAjaxTable(
        '#table-player',
        '#table-loader',
        'http://a-life.online/api/users?field=UserId&ascending=true'
      );
    }
  });

  var createAjaxTable = function(tableSelector, preloaderSelector, url) {
    var ascending = getParameterByName('ascending', url);

    var nextPageLink = null;
    var columnsNames = null;
    $(preloaderSelector).show();
    $.ajax({
      url: url,
      success: function(response) {
        if (response) {
          console.log(response);
          $(tableSelector).append('<thead></thead><tbody></tbody>');
          columnsNames = Object.keys(response.items[0]);
          nextPageLink = response.nextpage;
          fillTableHeader(columnsNames);
          fillTableBody(response.items, columnsNames);
          bindSortButtons(tableSelector);
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
          url: url,
          success: function(response) {
            if (response) {
              nextPageLink = response.NextPageLink;
              fillTableBody(response.items, columnsNames);
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
        tableHead += '<th><span>' + column + '</span><i class="sort-ascending"></i></th>';
      });
      $(tableSelector + ' thead').append(tableHead);
    };

    var fillTableBody = function(data, columnsNames, replace) {
      var tableBody = '';

      data.forEach(function(item) {
        tableBody += '<tr>';
        columnsNames.forEach(function(column) {
          tableBody += '<td>' + item[column] + '</td>';
        });
        tableBody += '</tr>';
      });
      replace ? $(tableSelector + ' tbody').html(tableBody) : $(tableSelector + ' tbody').append(tableBody);
    };

    var bindSortButtons = function(tableSelector) {
      var $tableHeaders = $(tableSelector + ' thead th');

      var changeAscending = function(_this) {
        var sortClass = 'sort-ascending';
        if (_this.find('i').hasClass(sortClass)) {
          _this.find('i').removeClass(sortClass);
          return 'false';
        } else {
          _this.find('i').addClass(sortClass);
          return 'true';
        }
      };

      $tableHeaders.click(function() {
        $.ajax({
          url:
            'http://a-life.online/api/users?field=' +
            $(this).find('span')[0].innerText +
            '&ascending=' +
            changeAscending($(this)),
          success: function(response) {
            console.log(response);
            if (response) {
              nextPageLink = response.NextPageLink;
              fillTableBody(response.items, columnsNames, true);
              $(preloaderSelector).hide();
            } else {
              $(preloaderSelector).html('<center>No more posts to show.</center>');
            }
          }
        });
      });
    };
  };
})();
