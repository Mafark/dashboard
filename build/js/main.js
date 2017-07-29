'use strict';
$(document).ready(function() {
  // load sidebar
  $.ajax({
    url: 'http://a-life.online/Dashboard/Servers',
    success: function(data) {
      // $('.sidebar').html(data);
      // menuInit();
    }
  });
  menuInit(); //dell

  // load initial content
  location.pathname === '/' ? $.pjax({ url: '../content/serverState.html', container: '.content' }) : null;
});

// menu initialization
$(document).pjax('a', '.content');

// event on load content
$(document).on('ready pjax:end', function(event) {
  $.event.trigger('changeUrl');
});

var CONSTANT = {
  site: ''
};
(function() {
  var chart_fps;
  var chart_trafic;

  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverState.html') {
      //create charts with params
      chart_fps = pasteLineChart(
        '#chart_fps',
        [],
        [
          {
            borderColor: 'rgb(235,89,55)',
            borderWidth: 1,
            lineTension: 0
          }
        ]
      );
      chart_trafic = pasteLineChart(
        '#chart_traffic',
        [],
        [
          {
            borderColor: 'rgb(235,89,55)',
            borderWidth: 1,
            lineTension: 0
          },
          {
            borderColor: 'rgb(10,20,20)',
            borderWidth: 1,
            lineTension: 0
          }
        ]
      );

      // create the handler function for socket
      var onMessage = function(msg) {
        // parse response
        var message = JSON.parse(msg.data);
        if (message.Error) {
          console.error('Error: ' + message.Error);
          return;
        }
        var data = JSON.parse(message.Data);

        // update stats data
        $('#serverstats_online').text(data.online + ' / ' + data.maxplayers);
        $('#serverstats_sleepers').text(data.sleepers);
        $('#serverstats_cpu').text(data.cpuLoad + '%');
        $('#serverstats_memory').text(data.memLoad + '%');

        // update charts data
        var labels = [];
        for (var i = 0; i < data.fps.length; i++) {
          labels[i] = data.fps.length - i;
        }
        updateData(chart_fps, labels, data.fps);
        updateData(chart_trafic, labels, data.traffic);
      };

      // connect to server
      createSocket('ws://91.214.70.52:28017/1234', 'server.state', onMessage);
    }
  });

  var updateData = function(chart, labels, data) {
    for (var i = 0; i < chart.data.datasets.length; i++) {
      chart.data.datasets[i].data = data;
    }
    chart.data.labels = labels;
    chart.update();
  };

  var pasteLineChart = function(selector, labels, datasets) {
    var ctx = $(selector);
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },

      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: 'nearest',
          intersect: false,
          backgroundColor: 'rgb(28, 25, 25, 0.8)',
          titleFontFamily: 'Roboto',
          bodyFontFamily: 'Roboto',
          footerFontFamily: 'Roboto',
          displayColors: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 0
              }
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });
  };
})();

var createSocket = function(url, message, onMessage) {
  var socket;
  var connected = false;

  typeof WebSocket !== 'undefined' &&
    (function connect() {
      socket = new WebSocket(url);
      socket.onmessage = onMessage;
      socket.onopen = () => {
        connected = true;
        setInterval(function() {
          socket.send('{ "command": "' + message + '" }');
        }, 1000);
      };
      socket.onerror = err => {
        console.error(err);
        socket.onclose = null;
        connected = false;
        socket.close();
        connect();
      };
      socket.onclose = event => {
        console.info(`WebSocket closed with code ${event.code}! ${event.reason}`);
        connected = false;
        if (event.wasClean) return;
        connect();
      };
    })();
};

(function() {
  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverPlayers.html') {
      createAjaxTable(
        '#table-player',
        '#table-loader',
        '#table-search',
        'http://a-life.online/api/users?field=UserId&ascending=true'
      );
    }
  });

  var createAjaxTable = function(tableSelector, preloaderSelector, seacrhFormSelector, url) {
    var nextPageLink = null;
    var columnsNames = null;
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
            'http://a-life.online/api/users?field=' +
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

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var menuInit = function() {
  //menu toggle
  var sidebar = $('.sidebar');
  var menuToggle = $('.menu-toggle');

  menuToggle.click(function() {
    if (sidebar.hasClass('menu-hidden')) {
      sidebar.removeClass('menu-hidden');
    } else {
      sidebar.addClass('menu-hidden');
    }
  });

  //dropdown toggle
  $('.dropdown-tab').children('a').click(function(params) {
    $(this).siblings('ul').slideToggle('medium');
  });

  //replace active class
  var links = $('.sidebar-menu a[href]');
  links.click(function(event) {
    links.each(function(index, link) {
      $(link).parent('li').removeClass('active');
    });
    $(this).parent('li').addClass('active');
  });
};

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

$(window).on('changeUrl', function(event, data) {
  svgReplace();
});

var svgReplace = function(params) {
  jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(
      imgURL,
      function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      'xml'
    );
  });
};
svgReplace();
