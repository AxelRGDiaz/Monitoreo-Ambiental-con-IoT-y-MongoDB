// public/JS/grafica.js

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Aquí irán tus etiquetas de tiempo, por ejemplo
            datasets: [{
                label: 'Temperatura',
                data: [], // Aquí irán tus datos de temperatura
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: [{
                    type: 'time',
                    time: {
                        parser: 'HH:mm:ss', // Ajusta el formato del tiempo según tus datos
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm:ss'
                        }
                    }
                }],
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const socket = io();
    socket.on('graficarDatos', (datos) => {
        // Formatear la fecha usando Moment.js si es necesario
        const formattedDate = moment(datos.time).format('YYYY-MM-DD HH:mm:ss');
    
        myChart.data.labels.push(formattedDate);
        myChart.data.datasets[0].data.push(datos.Luminucidad);
        myChart.update();
    });
});
