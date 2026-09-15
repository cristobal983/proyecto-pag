document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ESTADO Y VARIABLES
    // ==========================================
    const tableBody = document.getElementById('admin-table-body');
    const btnAdd = document.getElementById('btn-add-product');
    const modal = document.getElementById('admin-modal');
    const btnClose = document.getElementById('admin-modal-close');
    const btnCancel = document.getElementById('admin-modal-cancel');
    const form = document.getElementById('admin-form');
    const modalTitle = document.getElementById('modal-title');

    // Form inputs
    const inputId = document.getElementById('prod-id');
    const inputNombre = document.getElementById('prod-nombre');
    const inputMarca = document.getElementById('prod-marca');
    const inputPrecio = document.getElementById('prod-precio');
    const inputImagen = document.getElementById('prod-imagen');
    const inputCategoria = document.getElementById('prod-categoria');

    let products = [];

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    function init() {
        const localProducts = localStorage.getItem('fyny_products');
        if (localProducts) {
            try {
                products = JSON.parse(localProducts);
                renderTable();
            } catch(e) {
                console.error("Error parsing local products:", e);
                fetchInitialProducts();
            }
        } else {
            fetchInitialProducts();
        }
    }

    function fetchInitialProducts() {
        fetch('../data/zapatillas.json')
            .then(res => res.json())
            .then(data => {
                products = data;
                saveProducts();
                renderTable();
            })
            .catch(err => {
                console.error("Error fetching initial products:", err);
                alert("No se pudieron cargar los productos iniciales.");
            });
    }

    function saveProducts() {
        localStorage.setItem('fyny_products', JSON.stringify(products));
    }

    // ==========================================
    // RENDERIZAR TABLA
    // ==========================================
    function renderTable() {
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay productos.</td></tr>';
            return;
        }

        products.forEach(p => {
            const tr = document.createElement('tr');
            
            // Imagen resuelta
            let imgUrl = p.imagen || p.img;
            if (!imgUrl.startsWith('../')) {
                imgUrl = '../' + imgUrl;
            }

            const val = p.precio !== undefined ? p.precio : p.valor;

            tr.innerHTML = `
                <td><img src="${imgUrl}" alt="${p.titulo || p.nombre}" onerror="this.src='../imagenes/placeholder.jpg'"></td>
                <td>#${p.id}</td>
                <td><strong>${p.titulo || p.nombre}</strong></td>
                <td>${p.marca}</td>
                <td>$${val.toLocaleString('es-CL')}</td>
                <td>
                    <button class="action-btn btn-edit" data-id="${p.id}">Editar</button>
                    <button class="action-btn btn-delete" data-id="${p.id}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // ==========================================
    // EVENTOS DEL MODAL
    // ==========================================
    function openModal(isEdit = false, product = null) {
        modal.classList.add('active');
        if (isEdit && product) {
            modalTitle.textContent = 'Editar Producto';
            inputId.value = product.id;
            inputNombre.value = product.titulo || product.nombre;
            inputMarca.value = product.marca;
            inputPrecio.value = product.precio !== undefined ? product.precio : product.valor;
            inputImagen.value = product.imagen || product.img;
            inputCategoria.value = product.categoria || 'unisex';
        } else {
            modalTitle.textContent = 'Añadir Producto';
            form.reset();
            inputId.value = '';
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        form.reset();
    }

    if (btnAdd) btnAdd.addEventListener('click', () => openModal(false));
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);

    // ==========================================
    // CRUD ACTIONS
    // ==========================================
    // Submit form (Create / Edit)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const idVal = inputId.value;
            const nuevoProducto = {
                id: idVal ? parseInt(idVal, 10) : Date.now(), // Generate ID if new
                titulo: inputNombre.value,
                nombre: inputNombre.value,
                marca: inputMarca.value,
                precio: parseInt(inputPrecio.value, 10),
                valor: parseInt(inputPrecio.value, 10),
                imagen: inputImagen.value,
                img: inputImagen.value,
                categoria: inputCategoria.value,
                subtitulo: `${inputCategoria.value.charAt(0).toUpperCase() + inputCategoria.value.slice(1)} | 1 color`
            };

            if (idVal) {
                // Edit
                const index = products.findIndex(p => p.id === parseInt(idVal, 10));
                if (index > -1) {
                    products[index] = { ...products[index], ...nuevoProducto };
                }
            } else {
                // Add
                products.push(nuevoProducto);
            }

            saveProducts();
            renderTable();
            closeModal();
        });
    }

    // Edit and Delete buttons in table (Event Delegation)
    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                const product = products.find(p => p.id === id);
                if (product) openModal(true, product);
            }
            
            if (e.target.classList.contains('btn-delete')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                if (confirm(`¿Estás seguro de que deseas eliminar el producto #${id}?`)) {
                    products = products.filter(p => p.id !== id);
                    saveProducts();
                    renderTable();
                }
            }
        });
    }

    // Start
    init();
});
