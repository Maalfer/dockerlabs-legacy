function ranking() {
    // Crear el contenedor del overlay
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    overlayDiv.style.position = 'fixed';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.width = '100%';
    overlayDiv.style.height = '100%';
    overlayDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlayDiv.style.zIndex = '9998';
    overlayDiv.style.opacity = '0';
    overlayDiv.style.transition = 'opacity 0.3s ease';

    // Crear el contenedor del popup
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    popupDiv.style.width = '300px';
    popupDiv.style.height = '500px';
    popupDiv.style.backgroundColor = '#171724';
    popupDiv.style.color = '#ffffff';
    popupDiv.style.border = '2px solid #b7cfdd';
    popupDiv.style.borderRadius = '10px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popupDiv.style.position = 'fixed';
    popupDiv.style.top = '50%';
    popupDiv.style.left = '50%';
    popupDiv.style.transform = 'translate(-50%, -50%)';
    popupDiv.style.zIndex = '9999';
    popupDiv.style.padding = '20px';
    popupDiv.style.textAlign = 'center';
    popupDiv.style.overflowY = 'auto';
    popupDiv.style.transition = 'opacity 0.3s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    popupDiv.style.opacity = '0';
    popupDiv.style.transform = 'translate(-50%, -60%)';

    // Crear el botón de cierre
    var closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('modal-close-button');
    closeButton.addEventListener('click', function() {
        closePopup();
    });

    // Crear el contenido del popup
    var contenidoPopup = '<h1>CLASIFICACIÓN</h1>';

    // Cargar el archivo JSON desde Flask (dentro de la carpeta static)
    fetch('/static/ranking_writeups.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Ordenar los datos de mayor a menor puntuación
            data.sort((a, b) => b.puntos - a.puntos);

            // Crear la lista de clasificación
            var rankingList = '<ul style="list-style-type: none; padding: 0;">';
            data.forEach((item, index) => {
                // Determinar el color del puesto
                let color = "white"; // Color por defecto
                if (index === 0) color = "gold";        // 🥇 1º lugar
                else if (index === 1) color = "silver"; // 🥈 2º lugar
                else if (index === 2) color = "#cd7f32"; // 🥉 3º lugar

                // Agregar sufijo correcto para el puesto (1º, 2º, 3º, 4º, etc.)
                let positionSuffix = (index + 1) + (index === 0 ? "º" : index === 1 ? "º" : index === 2 ? "º" : "º");

                rankingList += `<li style="margin: 10px 0; color: ${color}; font-weight: bold;">
                    ${positionSuffix} ${item.nombre} - ${item.puntos} puntos
                </li>`;
            });
            rankingList += '</ul>';

            // Añadir la lista al contenido del popup
            contenidoPopup += rankingList;
            popupDiv.innerHTML = contenidoPopup;
            popupDiv.appendChild(closeButton);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            contenidoPopup += '<p>Error al cargar el ranking.</p>';
            popupDiv.innerHTML = contenidoPopup;
            popupDiv.appendChild(closeButton);
        });

    document.body.appendChild(overlayDiv);
    document.body.appendChild(popupDiv);

    // Función para cerrar el popup
    function closePopup() {
        popupDiv.style.opacity = '0';
        popupDiv.style.transform = 'translate(-50%, -60%)';
        overlayDiv.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(popupDiv);
            document.body.removeChild(overlayDiv);
        }, 300);
    }

    // Mostrar el popup y el overlay
    setTimeout(function() {
        popupDiv.style.opacity = '1';
        popupDiv.style.transform = 'translate(-50%, -50%)';
        overlayDiv.style.opacity = '1';
    }, 10);

    // Cerrar el popup si se hace clic en el overlay
    overlayDiv.addEventListener('click', function(event) {
        if (event.target === overlayDiv) {
            closePopup();
        }
    });
}


function rankingautores() {
    // Crear el contenedor del overlay
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    overlayDiv.style.position = 'fixed';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.width = '100%';
    overlayDiv.style.height = '100%';
    overlayDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlayDiv.style.zIndex = '9998';
    overlayDiv.style.opacity = '0';
    overlayDiv.style.transition = 'opacity 0.3s ease';

    // Crear el contenedor del popup
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    popupDiv.style.width = '300px';
    popupDiv.style.height = '500px';
    popupDiv.style.backgroundColor = '#171724';
    popupDiv.style.color = '#ffffff';
    popupDiv.style.border = '2px solid #b7cfdd';
    popupDiv.style.borderRadius = '10px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popupDiv.style.position = 'fixed';
    popupDiv.style.top = '50%';
    popupDiv.style.left = '50%';
    popupDiv.style.transform = 'translate(-50%, -50%)';
    popupDiv.style.zIndex = '9999';
    popupDiv.style.padding = '20px';
    popupDiv.style.textAlign = 'center';
    popupDiv.style.overflowY = 'auto';
    popupDiv.style.transition = 'opacity 0.3s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    popupDiv.style.opacity = '0';
    popupDiv.style.transform = 'translate(-50%, -60%)';

    // Crear el botón de cierre
    var closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('modal-close-button');
    closeButton.addEventListener('click', function() {
        closePopup();
    });

    // Crear el contenido del popup
    var contenidoPopup = '<h1>CLASIFICACIÓN AUTORES</h1>';

    // Cargar el archivo JSON desde Flask (dentro de la carpeta static)
    fetch('/static/ranking_creadores.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Ordenar los datos de mayor a menor número de máquinas creadas
            data.sort((a, b) => b.maquinas - a.maquinas);

            // Crear la lista de clasificación
            var rankingList = '<ul style="list-style-type: none; padding: 0;">';
            data.forEach((item, index) => {
                // Determinar el color del puesto
                let color = "white"; // Color por defecto
                if (index === 0) color = "gold";        // 🥇 1º lugar
                else if (index === 1) color = "silver"; // 🥈 2º lugar
                else if (index === 2) color = "#cd7f32"; // 🥉 3º lugar

                // Agregar sufijo correcto para el puesto (1º, 2º, 3º, 4º, etc.)
                let positionSuffix = (index + 1) + "º";

                rankingList += `<li style="margin: 10px 0; color: ${color}; font-weight: bold;">
                    ${positionSuffix} ${item.nombre} - ${item.maquinas} máquinas
                </li>`;
            });
            rankingList += '</ul>';

            // Añadir la lista al contenido del popup
            contenidoPopup += rankingList;
            popupDiv.innerHTML = contenidoPopup;
            popupDiv.appendChild(closeButton);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            contenidoPopup += '<p>Error al cargar el ranking.</p>';
            popupDiv.innerHTML = contenidoPopup;
            popupDiv.appendChild(closeButton);
        });

    document.body.appendChild(overlayDiv);
    document.body.appendChild(popupDiv);

    // Función para cerrar el popup
    function closePopup() {
        popupDiv.style.opacity = '0';
        popupDiv.style.transform = 'translate(-50%, -60%)';
        overlayDiv.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(popupDiv);
            document.body.removeChild(overlayDiv);
        }, 300);
    }

    // Mostrar el popup y el overlay
    setTimeout(function() {
        popupDiv.style.opacity = '1';
        popupDiv.style.transform = 'translate(-50%, -50%)';
        overlayDiv.style.opacity = '1';
    }, 10);

    // Cerrar el popup si se hace clic en el overlay
    overlayDiv.addEventListener('click', function(event) {
        if (event.target === overlayDiv) {
            closePopup();
        }
    });
}
