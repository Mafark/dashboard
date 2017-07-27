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
