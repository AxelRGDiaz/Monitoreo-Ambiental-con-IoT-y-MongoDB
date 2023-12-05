// Coordenadas del lugar deseado   19.326718292664353, -103.692619608782 el chivato
var latitud = 19.326718292664353; // Reemplaza con la latitud de tu ubicación
var longitud = -103.692619608782; // Reemplaza con la longitud de tu ubicación

// Coordenadas del lugar deseado   19.373243, -103.715518 Suchitlan
var latitudDos = 19.373243; // Reemplaza con la latitud de tu ubicación
var longitudDos = -103.715518; // Reemplaza con la longitud de tu ubicación

// Coordenadas del lugar deseado   19.216771614711075, -103.9360964294229 Agua Zarca
var latitudTres = 19.216771614711075; // Reemplaza con la latitud de tu ubicación
var longitudTres = -103.9360964294229; // Reemplaza con la longitud de tu ubicación

function initMap() {
    // Crear un nuevo mapa
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitud, lng: longitud },
        zoom: 11.2, // Puedes ajustar el nivel de zoom según tus necesidades
        mapTypeId: google.maps.MapTypeId.SATELLITE // Configurar el mapa en modo satélite
    });

    // Crear un marcador en la ubicación especificada
    var marker = new google.maps.Marker({
        position: { lat: latitud, lng: longitud },
        map: map,
        title: 'Sistema de monitoreo ambiental Chivato'
    });

    // Crear un marcador en la ubicación especificada
    var markerDos = new google.maps.Marker({
        position: { lat: latitudDos, lng: longitudDos },
        map: map,
        title: 'Sistema de monitoreo ambiental Suchitlan'
    });

    // Crear un marcador en la ubicación especificada
    var markerTres = new google.maps.Marker({
        position: { lat: latitudTres, lng: longitudTres },
        map: map,
        title: 'Sistema de monitoreo ambiental Agua Zarca'
    });


    // Crear un InfoWindow con el título Chivato
    var infoWindow = new google.maps.InfoWindow({
        content: `<a href="/allDoc"><label>Sistema de monitoreo Chivato</label></a>`,
        pixelOffset: new google.maps.Size(0, -30) // Ajusta la posición vertical del InfoWindow
    });
    // Almacenar el título original en una variable
    var tituloOriginal = infoWindow.getContent();


    // Crear un InfoWindow con el título Suchitlan
    var infoWindowDos = new google.maps.InfoWindow({
        content: `<a href="/allDoc"><label>Sistema de monitoreo Shuchitlan</label></a>`,
        pixelOffset: new google.maps.Size(0, -30) // Ajusta la posición vertical del InfoWindow
    });
    // Almacenar el título original en una variable
    var tituloOriginalDos = infoWindowDos.getContent();

    // Crear un InfoWindow con el título Agua Zarca
    var infoWindowTres = new google.maps.InfoWindow({
        content: `<a href="/allDoc"><label>Sistema de monitoreo Agua Zarca</label></a>`,
        pixelOffset: new google.maps.Size(0, -30) // Ajusta la posición vertical del InfoWindow
    });
    // Almacenar el título original en una variable
    var tituloOriginalTres = infoWindowTres.getContent();


    // Agregar un evento de clic al marcador
    marker.addListener('click', function () {
        // Redirigir a la URL deseada al hacer clic en el marcador
        window.location.href = '/allDoc';
    });
    markerDos.addListener('click', function () {
        // Redirigir a la URL deseada al hacer clic en el marcador
        window.location.href = '/allDoc';
    });
    markerTres.addListener('click', function () {
        // Redirigir a la URL deseada al hacer clic en el marcador
        window.location.href = '/allDoc';
    });

    // Agregar un evento de mouseover al marcador
    marker.addListener('mouseover', function () {
        // Hacer una solicitud AJAX a tu API
        $.ajax({
            url: 'http://localhost:3000/obtenerUltimoDocumento ' && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerUltimoDocumento', // URL de tu API
            method: 'GET',
            success: function (data) {
                // Construir el contenido del InfoWindow con los datos de la API
                var content = '<h3>Datos recientes:</h3>';
                content += '<p>Temperatura: ' + data.temperature + '</p>';
                content += '<p>Humedad: ' + data.humidity + '</p>';
                content += '<p>CO2: ' + data.CO2 + '</p>';
                content += '<p>Movimiento: ' + data.movimiento + '</p>';
                content += '<p>Fecha: ' + data.dia + '/' + data.mes + '/' + data.año + '</p>';
                content += '<p>Hora: ' + data.hora + ':' + data.minuto + ':' + data.segundo + '</p>';
                infoWindow.setContent(content);
                // Mostrar el InfoWindow cuando el cursor pasa sobre el marcador
                infoWindow.open(map, marker);
            },
            error: function (error) {
                console.error('Error al obtener datos de la API', error);
            }
        });
    });

    // Agregar un evento de mouseout al marcador
    marker.addListener('mouseout', function () {
        // Cerrar el InfoWindow cuando el mouse sale del marcador
        infoWindow.close();
        infoWindow.setContent(tituloOriginal);
        infoWindow.open(map, marker)
    });


    markerDos.addListener('mouseover', function () {
        // Hacer una solicitud AJAX a tu API
        $.ajax({
            url: 'http://localhost:3000/obtenerUltimoDocumento ' && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerUltimoDocumento', // URL de tu API
            method: 'GET',
            success: function (data) {
                // Construir el contenido del InfoWindow con los datos de la API
                var content = '<h3>Datos recientes:</h3>';
                content += '<p>Temperatura: ' + data.temperature + '</p>';
                content += '<p>Humedad: ' + data.humidity + '</p>';
                content += '<p>CO2: ' + data.CO2 + '</p>';
                content += '<p>Movimiento: ' + data.movimiento + '</p>';
                content += '<p>Fecha: ' + data.dia + '/' + data.mes + '/' + data.año + '</p>';
                content += '<p>Hora: ' + data.hora + ':' + data.minuto + ':' + data.segundo + '</p>';
                infoWindowDos.setContent(content);
                // Mostrar el InfoWindow cuando el cursor pasa sobre el marcador
                infoWindowDos.open(map, markerDos);
            },
            error: function (error) {
                console.error('Error al obtener datos de la API', error);
            }
        });
    });

    // Agregar un evento de mouseout al marcador
    markerDos.addListener('mouseout', function () {
        // Cerrar el InfoWindow cuando el mouse sale del marcador
        infoWindowDos.close();
        infoWindowDos.setContent(tituloOriginalDos);
        infoWindowDos.open(map, markerDos)
    });

    markerTres.addListener('mouseover', function () {
        // Hacer una solicitud AJAX a tu API
        $.ajax({
            url: 'http://localhost:3000/obtenerUltimoDocumento ' && 'https://2fc60p1f-3000.usw3.devtunnels.ms/obtenerUltimoDocumento', // URL de tu API
            method: 'GET',
            success: function (data) {
                // Construir el contenido del InfoWindow con los datos de la API
                var content = '<h3>Datos recientes:</h3>';
                content += '<p>Temperatura: ' + data.temperature + '</p>';
                content += '<p>Humedad: ' + data.humidity + '</p>';
                content += '<p>CO2: ' + data.CO2 + '</p>';
                content += '<p>Movimiento: ' + data.movimiento + '</p>';
                content += '<p>Fecha: ' + data.dia + '/' + data.mes + '/' + data.año + '</p>';
                content += '<p>Hora: ' + data.hora + ':' + data.minuto + ':' + data.segundo + '</p>';
                infoWindowTres.setContent(content);
                // Mostrar el InfoWindow cuando el cursor pasa sobre el marcador
                infoWindowTres.open(map, markerTres);
            },
            error: function (error) {
                console.error('Error al obtener datos de la API', error);
            }
        });
    });

    // Agregar un evento de mouseout al marcador
    markerTres.addListener('mouseout', function () {
        // Cerrar el InfoWindow cuando el mouse sale del marcador
        infoWindowTres.close();
        infoWindowTres.setContent(tituloOriginalTres);
        infoWindowTres.open(map, markerTres)
    });

    // Mostrar el InfoWindow cuando se carga el mapa
    infoWindow.open(map, marker);
    // Mostrar el InfoWindow cuando se carga el mapa
    infoWindowDos.open(map, markerDos);
    // Mostrar el InfoWindow cuando se carga el mapa
    infoWindowTres.open(map, markerTres);




}