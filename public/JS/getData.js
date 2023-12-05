const socket = io(); // Conectar al servidor de socket
console.log('Conexión de socket establecida:', socket);

document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById("data-container");

    // Función para renderizar el documento más reciente o nuevo
    const renderizarDocumento = (documento) => {
        // Limpiar el contenedor
        dataContainer.innerHTML = '';

        // Crear elementos para mostrar el nuevo documento
        const dataItem = document.createElement("div");
        dataItem.classList.add("data-item");

        const temperatureBar = document.createElement("div");
        temperatureBar.classList.add("temperature-bar");

        const temperatureLevel = document.createElement("div");
        temperatureLevel.classList.add("temperature-level");
        temperatureLevel.textContent = `${documento.temperature}°C`;

        // Verificar la temperatura y aplicar el estilo correspondiente
        if (documento.temperature >= 30) {
            temperatureBar.classList.add("high-temperature");
        } else {
            temperatureBar.classList.add("low-temperature");
        }

        temperatureBar.appendChild(temperatureLevel);
        dataItem.appendChild(temperatureBar);

        const humi = document.createElement("p");
        humi.textContent = `Humedad: ${documento.humidity}`;
        dataItem.appendChild(humi);

        const co2 = document.createElement("p");
        co2.textContent = `CO2: ${documento.CO2}`;
        dataItem.appendChild(co2);

        const movement = document.createElement("p");
        let movimientoN
        if(documento.movimiento == 0){
             moviemientoN='NO'
        }else {
            movimientoN = 'SI'
        }
        movement.textContent = `Movimiento: ${moviemientoN}`;
        dataItem.appendChild(movement);

        const fecha = document.createElement("p");
        fecha.textContent = `Fecha: ${documento.dia}/${documento.mes}/${documento.año}`;
        dataItem.appendChild(fecha);

        const Hora = document.createElement("p");
        Hora.textContent = `Hora: ${documento.hora}:${documento.minuto}:${documento.segundo}`;
        dataItem.appendChild(Hora);

        // Agregar el nuevo documento al contenedor
        dataContainer.appendChild(dataItem);
    };

    // Evento para recibir el último documento al cargar la página
    socket.on('ultimoDocumento', (documento) => {
        renderizarDocumento(documento);
    });

    // Evento para recibir un nuevo documento y actualizar la vista
    socket.on('nuevoDocumento', (data) => {
        console.log(data.message);
        renderizarDocumento(data.nuevoDocumento);
    });

    // Realizar una solicitud para obtener el último documento desde el servidor
    // && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerUltimoDocumento'
    fetch('http://localhost:3000/obtenerUltimoDocumento' && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerUltimoDocumento' )
        .then((response) => response.json())
        .then((data) => {
            renderizarDocumento(data);
        })
        .catch((error) => {
            console.error("Error al obtener el último documento:", error);
        });
});
