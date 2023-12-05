const socket = io(); // Conectar al servidor de socket
console.log('Conexión de socket establecida:', socket);
document.addEventListener("DOMContentLoaded", () => {

    socket.on('documentoEditado', (data) => {
        console.log(data.message);

        // Obtener el elemento correspondiente al documento editado y actualizar su contenido en el DOM
        const elementoEditado = document.getElementById(`documento_${data.id}`);
        if (elementoEditado) {
            // Actualizar el contenido del elemento con los nuevos datos
            elementoEditado.querySelector('.temperature-level').textContent = `${data.updatedData.temperature}°C`;
            elementoEditado.querySelector('p:nth-child(2)').textContent = `Humedad: ${data.updatedData.humidity}`;
            elementoEditado.querySelector('p:nth-child(3)').textContent = `CO2: ${data.updatedData.CO2}`;
            elementoEditado.querySelector('p:nth-child(4)').textContent = `Movimiento: ${data.updatedData.movimiento}`;
            elementoEditado.querySelector('p:nth-child(5)').textContent = `Fecha: ${data.updatedData.dia}/${data.updatedData.mes}/${data.updatedData.año} Hora: ${data.updatedData.hora}:${data.updatedData.minuto}:${data.updatedData.segundo}`;
        }
    });


    socket.on('documentoEliminado', (data) => {
        console.log(data.message);

        // Obtener el elemento correspondiente al documento eliminado y quitarlo del DOM
        const elementoEliminado = document.getElementById(`documento_${data.id}`);
        if (elementoEliminado) {
            elementoEliminado.remove();
        }
    });

    socket.on('nuevoDocumento', (data) => {
        console.log(data.message);

        // Obtener el contenedor de datos
        const dataContainer = document.getElementById("data-container");

        // Crear un nuevo elemento div para el nuevo documento
        const dataItem = document.createElement("div");
        const itemId = `documento_${data.nuevoDocumento._id}`; // Crear un identificador único basado en el _id
        dataItem.id = itemId; // Asignar el identificador al elemento
        dataItem.classList.add("data-item");

        // Crear la barra de temperatura para el nuevo documento
        const temperatureBar = document.createElement("div");
        temperatureBar.classList.add("temperature-bar");

        // Verificar la temperatura y aplicar el estilo correspondiente
        if (data.nuevoDocumento.temperature >= 30) {
            temperatureBar.classList.add("high-temperature");
        } else {
            temperatureBar.classList.add("low-temperature");
        }

        const temperatureLevel = document.createElement("div");
        temperatureLevel.classList.add("temperature-level");
        temperatureLevel.textContent = `${data.nuevoDocumento.temperature}°C`;
        temperatureBar.appendChild(temperatureLevel);
        dataItem.appendChild(temperatureBar);

        // Agregar el resto de la información del nuevo documento
        const humi = document.createElement("p");
        humi.textContent = `Humedad: ${data.nuevoDocumento.humidity}`;
        dataItem.appendChild(humi);

        const co2 = document.createElement("p");
        co2.textContent = `CO2: ${data.nuevoDocumento.CO2}`;
        dataItem.appendChild(co2);

        const movement = document.createElement("p");
        movement.textContent = `Movimiento: ${data.nuevoDocumento.movimiento}`;
        dataItem.appendChild(movement);

        const fecha = document.createElement("p");
        fecha.textContent = `Fecha: ${data.nuevoDocumento.dia}/${data.nuevoDocumento.mes}/${data.nuevoDocumento.año}`;
        dataItem.appendChild(fecha);

        const Hora = document.createElement("p");
        Hora.textContent = ` Hora: ${data.nuevoDocumento.hora}:${data.nuevoDocumento.minuto}:${data.nuevoDocumento.segundo}`;
        dataItem.appendChild(Hora);

        // Agregar el nuevo documento al contenedor de datos
        dataContainer.appendChild(dataItem);
    });

    socket.on('errorAgregarDocumento', (data) => {
        console.error(data.error);
    });
    // Realiza una solicitud para obtener los datos desde MongoDB Atlas
    // && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerP'
    fetch('http://localhost:3000/obtenerP' && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerP')
        .then((response) => response.json())
        .then((data) => {
            const dataContainer = document.getElementById("data-container");

            data.forEach((item) => {
                const dataItem = document.createElement("div");
                const itemId = `documento_${item._id}`; // Crear un identificador único basado en el _id
                dataItem.id = itemId; // Asignar el identificador al elemento
                dataItem.classList.add("data-item");

                // Crear la barra de temperatura para cada conjunto de datos
                const temperatureBar = document.createElement("div");
                temperatureBar.classList.add("temperature-bar");

                // Verificar si la temperatura es mayor o igual a 30°C y aplicar el estilo correspondiente
                if (item.temperature >= 30) {
                    temperatureBar.classList.add("high-temperature");
                }
                if (item.temperature < 30) {
                    temperatureBar.classList.add("low-temperature");
                }

                const temperatureLevel = document.createElement("div");
                temperatureLevel.classList.add("temperature-level");
                temperatureLevel.textContent = `${item.temperature}°C`;
                temperatureBar.appendChild(temperatureLevel);
                dataItem.appendChild(temperatureBar);


                const humi = document.createElement("p");
                humi.textContent = `Humedad: ${item.humidity}`;
                dataItem.appendChild(humi);

                const co2 = document.createElement("p");
                co2.textContent = `CO2: ${item.CO2}`;
                dataItem.appendChild(co2);

                let movimientoN
                if(item.movimiento== 0){
                     movimientoN='NO'
                }else {
                    movimientoN = 'SI'
                }
                const movement = document.createElement("p");
                movement.textContent = `Movimiento: ${movimientoN}`;
                dataItem.appendChild(movement);

                const fecha = document.createElement("p");
                fecha.textContent = `Fecha: ${item.dia}/${item.mes}/${item.año} `;
                dataItem.appendChild(fecha);

                const Hora = document.createElement("p");
                Hora.textContent = ` Hora: ${item.hora}:${item.minuto}:${item.segundo}`;
                dataItem.appendChild(Hora);

                dataContainer.appendChild(dataItem);
            });
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });

});
