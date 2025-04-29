function subirwriteup(nombre) {
    // Crear el contenedor del overlay
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    overlayDiv.style.position = 'fixed';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.width = '100%';
    overlayDiv.style.height = '100%';
    overlayDiv.style.background = 'rgba(0, 0, 0, 0.5)';
    overlayDiv.style.zIndex = '9998';
    overlayDiv.style.opacity = '0';
    overlayDiv.style.transition = 'opacity 0.3s ease';

    // Crear el contenedor del popup
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    popupDiv.style.width = '360px';
    popupDiv.style.backgroundColor = '#101016';
    popupDiv.style.color = '#ffffff';
    popupDiv.style.border = '1px solid #cccccc';
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
    closeButton.classList.add('modal-close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
        closePopup();
    });

    // Crear el contenido del popup
    var contenidoPopup = '<h2 style="margin-bottom: 20px;">Envía tu Writeup</h2>';
    contenidoPopup += '<input id="autor" type="text" placeholder="Autor" style="width: 90%; padding: 10px; margin-bottom: 10px; border: none; background-color: #1a1a1f; color: #ffffff; border-radius: 5px;">';
    contenidoPopup += '<br>';
    contenidoPopup += '<input id="url" type="text" placeholder="URL" style="width: 90%; padding: 10px; margin-bottom: 10px; border: none; background-color: #1a1a1f; color: #ffffff; border-radius: 5px;">';
    contenidoPopup += '<br>';
    contenidoPopup += '<select id="tipo" style="width: 90%; padding: 10px; margin-bottom: 10px; border: none; background-color: #1a1a1f; color: #ffffff; border-radius: 5px;">';
    contenidoPopup += '<option value="video">Video</option>';
    contenidoPopup += '<option value="texto">Texto</option>';
    contenidoPopup += '</select>';
    contenidoPopup += '<br>';
    contenidoPopup += '<button id="enviarButton" style="width: 100%; padding: 10px; margin-top: 20px; border: none; background-color: #43959b; color: white; font-size: 16px; cursor: pointer; border-radius: 5px;">Enviar</button>';

    popupDiv.innerHTML = contenidoPopup;
    popupDiv.appendChild(closeButton);
    document.body.appendChild(overlayDiv);
    document.body.appendChild(popupDiv);

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

    // Evento para enviar el writeup
    document.getElementById('enviarButton').addEventListener('click', function() {
        let autor = document.getElementById('autor').value;
        let url = document.getElementById('url').value;
        let tipo = document.getElementById('tipo').value;

        // Enviar la solicitud al endpoint /subirwriteups sin token
        fetch('/subirwriteups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ maquina: nombre, autor, url, tipo })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert(data.message);
                closePopup();
            }
        })
        .catch(error => {
            alert('Error al enviar el writeup.');
            console.error(error);
        });
    });
}
