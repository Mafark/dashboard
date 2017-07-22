$(window).on('changeUrl', function(event, data) {
  if (location.pathname === '/content/serverState.html') {
    var labels = ['02:04:33', '02:04:35', '02:04:40'];
    var data = [10, 20, 30];
    pasteLineChart('#chart_fps', 'fps', labels, data);
    pasteLineChart('#chart_traffic', 'traffic', labels, data);
  }
});

var pasteLineChart = function(selector, label, labels, data) {
  var ctx = $(selector);
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          borderColor: 'rgb(235,89,55)',
          borderWidth: 1,
          lineTension: 0,
          data: data
        }
      ]
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
        ]
      }
    }
  });
};
