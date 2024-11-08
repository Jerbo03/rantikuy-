const socket = io();

// Gráficos usando Chart.js (asegúrate de incluir Chart.js en el proyecto)
const ctxMayorista = document.getElementById('chartMayorista').getContext('2d');
const ctxCal = document.getElementById('chartCal').getContext('2d');

const chartMayorista = new Chart(ctxMayorista, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Oferta', data: [] }] },
    options: { responsive: true }
});

const chartCal = new Chart(ctxCal, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Demanda', data: [] }] },
    options: { responsive: true }
});

socket.on('actualizarGraficos', (data) => {
    const time = new Date().toLocaleTimeString();
    chartMayorista.data.labels.push(time);
    chartMayorista.data.datasets[0].data.push(data.oferta);
    chartMayorista.update();

    chartCal.data.labels.push(time);
    chartCal.data.datasets[0].data.push(data.demanda);
    chartCal.update();
});
