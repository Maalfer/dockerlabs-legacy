function presentacion(nombre, dificultad, color, autor_nombre, autor_enlace, fecha, imagen) {
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
    popupDiv.style.backgroundColor = '#171724';
    popupDiv.style.color = '#ffffff';
    popupDiv.style.border = '2px solid #b7cfdd';
    popupDiv.style.borderRadius = '10px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popupDiv.style.position = 'absolute';
    popupDiv.style.left = '50%';
    popupDiv.style.transform = 'translateX(-50%)';
    popupDiv.style.zIndex = '9999';
    popupDiv.style.padding = '20px';
    popupDiv.style.textAlign = 'center';
    popupDiv.style.overflowY = 'auto';
    popupDiv.style.transition = 'opacity 0.3s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    popupDiv.style.opacity = '0';
    popupDiv.style.fontFamily = 'Fira Code, Arial, sans-serif';

    // Ajustar la posición del popup en función del scroll actual
    var scrollY = window.scrollY;
    popupDiv.style.top = `${scrollY + window.innerHeight / 2}px`;

    // Crear el botón de cierre
    var closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('modal-close-button');
    closeButton.addEventListener('click', function() {
        closePopup();
    });

    // Crear el contenedor del contenido
    var contentDiv = document.createElement('div');
    contentDiv.style.display = 'flex';
    contentDiv.style.flexDirection = 'column';
    contentDiv.style.alignItems = 'center';

    // Crear el título
    var titulo = document.createElement('h1');
    titulo.textContent = nombre;
    titulo.style.width = '100%';
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '10px';
    titulo.style.fontFamily = 'Fira Code, Arial, sans-serif';

    // Crear el contenedor de la imagen y la información
    var infoContainer = document.createElement('div');
    infoContainer.style.display = 'flex';
    infoContainer.style.width = '100%';
    infoContainer.style.flexDirection = 'column';
    infoContainer.style.alignItems = 'center';
    infoContainer.style.marginTop = '10px';

    // Obtener la URL base de Flask para imágenes
    var imagenUrl = "/static/images/" + imagen;
    
    // Crear la imagen
    var imagenElem = document.createElement('img');
    imagenElem.src = imagenUrl;
    imagenElem.alt = 'DockerLabs';
    imagenElem.style.width = '150px';
    imagenElem.style.height = '150px';
    imagenElem.style.marginBottom = '20px';


    // Crear la información
    var infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
        <p style="font-size: 20px; font-family: Fira Code, Arial, sans-serif;"><strong>Autor:</strong> <a href="${autor_enlace}" target="_blank" style="color: white; text-decoration: none;">${autor_nombre}</a></p>
        <p style="font-size: 20px; font-family: Fira Code, Arial, sans-serif;"><strong>Dificultad:</strong> <span style="background-color: ${color}; padding: 5px; border-radius: 5px;">${dificultad}</span></p>
        <p style="font-size: 20px; font-family: Fira Code, Arial, sans-serif;"><strong>Fecha de creación:</strong> ${fecha}</p>
    `;

    // Añadir la imagen y la información al contenedor
    infoContainer.appendChild(imagenElem);
    infoContainer.appendChild(infoDiv);

    // Añadir el título y el contenedor de información al contenido
    contentDiv.appendChild(titulo);
    contentDiv.appendChild(infoContainer);
    popupDiv.appendChild(contentDiv);
    popupDiv.appendChild(closeButton);

    // Añadir el popup y el overlay al body
    document.body.appendChild(overlayDiv);
    document.body.appendChild(popupDiv);

    // Ajustar el tamaño del popup al cargar la página y al redimensionar la ventana
    ajustarPopup(popupDiv, infoContainer, imagenElem, infoDiv);
    window.addEventListener('resize', function() {
        ajustarPopup(popupDiv, infoContainer, imagenElem, infoDiv);
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

// Función para ajustar el diseño del popup en función del tamaño de la pantalla
function ajustarPopup(popupDiv, infoContainer, imagenElem, infoDiv) {
    var width = window.innerWidth;
    if (width <= 600) { // Ajustar para pantallas pequeñas
        popupDiv.style.width = '85%';
        popupDiv.style.height = '60%';
        popupDiv.style.padding = '10px';
        popupDiv.style.fontSize = '14px';
        infoContainer.style.flexDirection = 'column';
        infoContainer.style.alignItems = 'center';
        imagenElem.style.marginBottom = '20px';
        infoDiv.style.marginLeft = '0';
    } else {
        popupDiv.style.width = '550px';  // Hacer el contenedor más estrecho
        popupDiv.style.height = '300px';
        popupDiv.style.padding = '20px';
        popupDiv.style.fontSize = '16px';
        infoContainer.style.flexDirection = 'row';
        infoContainer.style.alignItems = 'center';
        imagenElem.style.marginBottom = '0';
        infoDiv.style.marginLeft = '20px';
    }
}
