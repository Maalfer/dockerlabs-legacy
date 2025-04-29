function createPopup(contenidoPopup) {
    // Agregar estilos CSS al documento
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .overlay.visible {
            opacity: 1;
        }
        .popup {
            background-color: #171724;
            color: #ffffff;
            border: 2px solid #b7cfdd;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            padding: 20px;
            text-align: center;
            max-width: 90%;
            max-height: 80%;
            overflow-y: auto;
            opacity: 0;
            transform: translate(-50%, -60%);
            transition: opacity 0.3s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: 'Fira Code', monospace;
        }
        .popup.visible {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        .popup p, .popup h1 {
            font-family: 'Fira Code', monospace;
        }
        .popup ul {
            list-style-type: none; /* Eliminar viñetas de la lista */
            padding: 0; /* Eliminar padding por defecto */
        }
        .popup li {
            margin: 10px 0; /* Espaciado entre los elementos de la lista */
        }
        .popup a {
            color: white; /* Hacer el texto del enlace blanco */
            text-decoration: none; /* Eliminar el subrayado */
            transition: transform 0.3s ease; /* Transición suave para el zoom */
            display: inline-block; /* Permitir transformaciones en el elemento */
        }
        .popup a:hover {
            transform: scale(1.1); /* Aplicar el zoom al pasar el cursor */
        }
    `;
    document.head.appendChild(style);

    // Crear el contenedor del overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';

    // Crear el contenedor del popup
    const popupDiv = document.createElement('div');
    popupDiv.className = 'popup';

    // Crear el botón de cierre
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'modal-close-button';
    closeButton.addEventListener('click', closePopup);

    // Añadir el contenido al popup
    popupDiv.innerHTML = contenidoPopup;
    popupDiv.appendChild(closeButton);

    // Añadir el popup y el overlay al body
    document.body.appendChild(overlayDiv);
    document.body.appendChild(popupDiv);

    // Mostrar el popup y el overlay
    setTimeout(() => {
        popupDiv.classList.add('visible');
        overlayDiv.classList.add('visible');
    }, 10);

    // Cerrar el popup si se hace clic en el overlay
    overlayDiv.addEventListener('click', (event) => {
        if (event.target === overlayDiv) {
            closePopup();
        }
    });

    // Función para cerrar el popup
    function closePopup() {
        popupDiv.classList.remove('visible');
        overlayDiv.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(popupDiv);
            document.body.removeChild(overlayDiv);
        }, 300);
    }
}

function showEnlaces(machine) {
    fetch('/static/writeups.json')  // Se carga desde /static/
        .then(response => response.json())
        .then(data => {
            const enlaces = data[machine];

            let content = "<ul>";
            if (!enlaces || enlaces.length === 0) {
                content += "<li>No hay enlaces disponibles.</li>";
            } else {
                for (let i = 0; i < enlaces.length; i++) {
                    content += `<li>${enlaces[i].type} <a href="${enlaces[i].url}" target="_blank">${enlaces[i].name}</a></li>`;
                }
            }
            content += "</ul>";
            createPopup(content);
        })
        .catch(error => console.error('Error loading the links:', error));
}


