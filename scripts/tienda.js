document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productos-container');
    
    if (container) {
        fetch('../data/zapatillas.json')
            .then(response => response.json())
            .then(productos => {
                container.innerHTML = '';
                
                productos.forEach(producto => {
                    const card = `
                        <div class="column is-one-third">
                            <div class="box has-text-centered" style="height: 100%; display: flex; flex-direction: column;">
                                <figure class="image is-4by3">
                                    <img src="${producto.img}" alt="${producto.titulo}" style="object-fit: cover;">
                                </figure>
                                <h2 class="title is-4 mt-3">${producto.titulo}</h2>
                                <p class="subtitle is-5 has-text-dark has-text-weight-bold">$${producto.precio}</p>
                                <p class="mb-4" style="flex-grow: 1;">${producto.descripcion}</p>
                                <button class="button is-dark is-fullwidth">Añadir al carrito</button>
                            </div>
                        </div>
                    `;
                    container.innerHTML += card;
                });
            })
            .catch(error => {
                console.error('Error cargando los productos:', error);
                container.innerHTML = '<p class="has-text-danger has-text-centered">Hubo un error al cargar los productos.</p>';
            });
    }
});
