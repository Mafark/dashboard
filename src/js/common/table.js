(function() {
  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverPlayers.html') {
      createAjaxTable('#table-player', '#table-loader', '#table-search', 'http://a-life.online/api/users?', {
        field: 'UserId',
        ascending: 'true'
      });
    }
  });

  var createAjaxTable = function(
    tableSelector,
    preloaderSelector,
    seacrhFormSelector,
    initialUrl,
    urlParams
  ) {
    // global vars
    var url = initialUrl;
    var nextPageLink = null;
    var columnsNames = null;

    //generate url
    var paramsNames = Object.keys(urlParams);
    paramsNames.forEach(function(param) {
      url += param + '=' + urlParams[param] + '&';
    });
    url = url.slice(0, -1);

    // get initial table
    $(preloaderSelector).show();
    $.ajax({
      url: url,
      success: function(response) {
        if (response) {
          $(tableSelector).append('<thead></thead><tbody></tbody>');
          columnsNames = Object.keys(response.items[0]);
          nextPageLink = response.nextpage;
          fillTableHeader(columnsNames);
          fillTableBody(response.items, columnsNames);
          bindSortButtons(tableSelector, columnsNames);
          initSearchForm(url, columnsNames);
          $(preloaderSelector).hide();
        } else {
          $(preloaderSelector).html('<center>No more posts to show.</center>');
        }
      }
    });

    // infinity scroll
    $(window).scroll(function() {
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        $(preloaderSelector).show();
        $.ajax({
          url: nextPageLink ? nextPageLink : url,
          success: function(response) {
            if (response) {
              nextPageLink = response.nextpage;
              fillTableBody(response.items, columnsNames);
              $(preloaderSelector).hide();
              if ((response.items.length = 0)) {
                $(preloaderSelector).html('<center>No more posts to show.</center>');
              } else {
                $(preloaderSelector).html('<center><img src="/img/preloader.svg" /></center>');
              }
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

    var bindSortButtons = function(tableSelector, columnsNames) {
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
            initialUrl +
            'field=' +
            $(this).find('span')[0].innerText +
            '&ascending=' +
            changeAscending($(this)),
          success: function(response) {
            if (response) {
              nextPageLink = response.nextpage;
              fillTableBody(response.items, columnsNames, true);
            }
          }
        });
      });
    };

    var initSearchForm = function(url, columnsNames) {
      $('#table-search').submit(function(e) {
        e.preventDefault();
        $.ajax({
          url: url + '&findpart=' + $(this).find('input').val(),
          success: function(response) {
            if (response) {
              nextPageLink = response.nextpage;
              fillTableBody(response.items, columnsNames, true);
            }
          }
        });
      });
    };
  };
})();
