function filterList() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filter = document.getElementById('filter').value;
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemDifficulty = item.classList.contains(filter) || filter === 'todos';

        if (itemName.includes(searchQuery) && itemDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function botonmuyfacil() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filter = 'muy-facil'; 
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemDifficulty = item.classList.contains(filter) || filter === 'todos';

        if (itemName.includes(searchQuery) && itemDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Función para cargar el archivo JSON y actualizar el texto del botón
document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar el archivo JSON y actualizar el texto del botón
    fetch('writeups.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Inicializar el contador total de tutoriales
            let totalTutoriales = 0;

            // Iterar sobre cada categoría del JSON y sumar la cantidad de tutoriales
            for (const category in data) {
                if (Array.isArray(data[category])) {
                    totalTutoriales += data[category].length;
                }
            }

            // Actualizar el texto del botón
            const button = document.getElementById('instrucciones');
            if (button) {
                button.textContent = `WriteUps(${totalTutoriales})`;
            } else {
                console.error('No se encontró el botón con el ID "instrucciones".');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


function botonfacil() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filter = 'facil'; 
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemDifficulty = item.classList.contains(filter) || filter === 'todos';

        if (itemName.includes(searchQuery) && itemDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}



function botonmedio() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filter = 'medio';  
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemDifficulty = item.classList.contains(filter) || filter === 'todos';

        if (itemName.includes(searchQuery) && itemDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}



function botondificil() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filter = 'dificil'; 
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemDifficulty = item.classList.contains(filter) || filter === 'todos';

        if (itemName.includes(searchQuery) && itemDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function botontodos() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filter = 'todos';  
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        const itemDifficulty = item.classList.contains(filter) || filter === 'todos';

        if (itemName.includes(searchQuery) && itemDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

