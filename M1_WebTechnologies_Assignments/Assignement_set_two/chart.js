
let chart; 

function updateChart(totals) {
  const ctx = document.getElementById('expense-chart').getContext('2d');
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(totals),
      datasets: [
        {
          data: Object.values(totals),
          backgroundColor: ['#6A85FB', '#FC5C7D', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#5671E2', '#E14A65', '#EBCB4E', '#3A9F9F', '#7F61DF'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'white',
          },
        },
      },
    },
  });
}
