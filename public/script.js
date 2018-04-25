function pointColors(results, answer) {
  return results.map(r => r.value === answer ? 'green' : 'lightblue');
}


$(function() {

  const context = document.getElementById('chart').getContext('2d');

  (async () => {
    const response = await fetch('/data.json');
    const json = await response.json();
    const results = json.results;
    const colors = pointColors(results, json.expected);

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
          backgroundColor: 'lightblue',
          borderColor: 'lightblue',
          pointBackgroundColor: colors,
          pointBorderColor: colors,
          data: results.map(r => r.value)
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
