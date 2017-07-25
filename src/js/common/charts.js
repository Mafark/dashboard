(function() {
  var chart_fps;
  var chart_trafic;

  $(window).on('changeUrl', function(event, data) {
    if (location.pathname === '/content/serverState.html') {
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
      createSocket('ws://91.214.70.52:28017/1234', chart_fps, 'fps.graph');
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

      // Configuration options go here
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

  var createSocket = function(url, chart, message) {
    var socket;
    var connected = false;

    typeof WebSocket !== 'undefined' &&
      (function connect() {
        socket = new WebSocket(url);
        socket.onmessage = onMessage;
        socket.onopen = () => {
          connected = true;
          setInterval(function() {
            socket.send('{ "message": "' + message + '" }');
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

    function onMessage(msg) {
      var data = JSON.parse(JSON.parse(msg.data).Message);
      var labels = [];
      for (var i = 0; i < data.length; i++) {
        labels[i] = data.length - i;
      }
      updateData(chart, labels, data);
    }
  };
})();
