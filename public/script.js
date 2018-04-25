function setDataColor(context) {
  var index = context.dataIndex;
  var value = context.dataset.data[index];
  return value === 24 ? 'green' : 'red';
}

$(function() {

  const context = document.getElementById('chart').getContext('2d');

  (async () => {
    const response = await fetch('/data.json');
    const json = await response.json();
    const results = json.results;

    $('#input').html(json.input.join(', '));
    $('#expected').html(json.expected);
    $('#total').html(results.length.toLocaleString());
    $('#time').html(json.time);
    $('#answers').html(JSON.stringify(json.answers, null, 2));

    const chart = new Chart(context, {
      type: 'line',
      data: {
        labels: Object.keys(results),
        datasets: [{
          label: 'Results',
          pointBackgroundColor: 'lightblue',
          pointBorderColor: 'lightblue',
          data: results.map(r => r.result)
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0, // disables bezier curves
          }
        },
        showLines: false,
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
      }
    });
  })();

});
