function menu() {
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
    popupDiv.style.backgroundColor = '#101016';
    popupDiv.style.color = '#ffffff';
    popupDiv.style.border = '2px solid #b7cfdd';
    popupDiv.style.borderRadius = '10px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popupDiv.style.position = 'absolute';
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
    var contenidoPopup = '<h1>Menú</h1>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://dockerlabs.es/instrucciones_de_uso.pdf" target="_blank" style="color: white; text-decoration: none;"><strong>Instrucciones de Uso</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://github.com/PatxaSec/DockerLabs" target="_blank" style="color: white; text-decoration: none;"><strong>Dockerlabs-Cli</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://github.com/Santitub/dockerlabs-gui" target="_blank" style="color: white; text-decoration: none;"><strong>Dockerlabs-Gui</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://discord.com/invite/dD3yVejBUR" target="_blank" style="color: white; text-decoration: none;"><strong>Enviar Máquina</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://www.youtube.com/watch?v=kDAK9Wc8o_k" target="_blank" style="color: white; text-decoration: none;"><strong>¿Cómo se crea una Máquina?</strong></a></p>';
    contenidoPopup += `<p style="font-size: 17px;" onmouseover="this.style.transform='scale(1.1)'; this.style.transition='transform 0.3s ease';" onmouseout="this.style.transform='scale(1)'; this.style.transition='transform 0.3s ease';"><a href="${window.location.origin}/terminos-condiciones" target="_blank" style="color: white; text-decoration: none;"><strong>Términos y Condiciones</strong></a></p>`;


    popupDiv.innerHTML = contenidoPopup;
    popupDiv.appendChild(closeButton);
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

    // Mostrar el popup
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

function agradecimientos() {
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
    popupDiv.style.width = '405px';
    popupDiv.style.height = '400px';
    popupDiv.style.backgroundColor = '#101016';
    popupDiv.style.color = '#ffffff';
    popupDiv.style.border = '2px solid #b7cfdd'; 
    popupDiv.style.borderRadius = '10px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popupDiv.style.position = 'absolute';
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
    popupDiv.style.display = 'flex';
    popupDiv.style.flexDirection = 'column';

    // Crear el botón de cierre
    var closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('modal-close-button');
    closeButton.addEventListener('click', function() {
        closePopup();
    });

    // Crear el contenido del popup
    var contenidoPopup = '<div style="margin-bottom: 20px;">';
    contenidoPopup += '<h1>Agradecimientos</h1>';
    contenidoPopup += '</div>';
    contenidoPopup += '<div style="display: flex; justify-content: center; align-items: center;">';
    contenidoPopup += '<img src="/static/images/logos/logo.png" alt="DockerLabs" width="150" height="150" style="margin-right: 20px;">';
    contenidoPopup += '<div>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://github.com/D1se0" target="_blank" style="color: white; text-decoration: none;"><strong>D1se0</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://thehackerslabs.com/" target="_blank" style="color: white; text-decoration: none;"><strong>The Hackers Labs</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://hackmyvm.eu" target="_blank" style="color: white; text-decoration: none;"><strong>HackMyVM</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://www.youtube.com/@ViejoFraile" target="_blank" style="color: white; text-decoration: none;"><strong>Viejo Fraile</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://www.linkedin.com/in/miguel-anxo-garc%C3%ADa-gonz%C3%A1lez-aka-pylon-454b3a291/?trk=public_post_comment_actor-image&originalSubdomain=es" target="_blank" style="color: white; text-decoration: none;"><strong>Pylon</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://github.com/javierfdezsua" target="_blank" style="color: white; text-decoration: none;"><strong>Javier Fernández</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://github.com/Maciferna" target="_blank" style="color: white; text-decoration: none;"><strong>Maciiii__</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://es.linkedin.com/in/ander-g-obieta&ved=2ahUKEwjthayC5bCHAxVlQvEDHcXEB8IQFnoECBUQAQ&usg=AOvVaw2ObuZZN39HwXBycVjo8Ymp" target="_blank" style="color: white; text-decoration: none;"><strong>PatxaSec</strong></a></p>';
    contenidoPopup += '<p style="font-size: 17px;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.transition=\'transform 0.3s ease\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.transition=\'transform 0.3s ease\';"><a href="https://len4m.github.io/" target="_blank" style="color: white; text-decoration: none;"><strong>LenamGenX</strong></a></p>';
    contenidoPopup += '</div>';
    contenidoPopup += '</div>';

    popupDiv.innerHTML = contenidoPopup;
    popupDiv.appendChild(closeButton);
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
