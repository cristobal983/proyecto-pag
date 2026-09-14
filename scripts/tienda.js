document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // DOM Elements
    // ============================================================
    const gridContainer = document.getElementById('productos-grid');
    const filterTitleText = document.getElementById('filter-title-text');
    const productCountBadge = document.getElementById('product-count-badge');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    
    // Cart Drawer Elements
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Product Modal Elements
    const modalOverlay = document.getElementById('product-modal-overlay');
    const modalContent = document.getElementById('product-modal-content');
    const toastContainer = document.getElementById('toast-container');

    // State
    let allProducts = [];
    let activeFilter = 'all';
    let searchQuery = '';
    let selectedModalSize = 41;

    // Fallback data for local file:// protocol or offline browsing
    const fallbackProducts = [
        {
            "id": 1,
            "nombre": "Zapatilla Jordan Son of Mars Low Hombre",
            "titulo": "Zapatilla Jordan Son of Mars Low Hombre",
            "marca": "JORDAN",
            "subtitulo": "Hombre | 1 color",
            "valor": 172990,
            "precio": 172990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "hombre",
            "colores": 1,
            "imagen": "../imagenes/jordan_son_mars.jpg",
            "img": "../imagenes/jordan_son_mars.jpg",
            "descripcion": "El estilo híbrido definitivo de Jordan que combina elementos icónicos de la línea clásica para máxima presencia urbana.",
            "tallas": [39, 40, 41, 42, 43, 44]
        },
        {
            "id": 2,
            "nombre": "Zapatilla Salomon XT-6 GTX Unisex",
            "titulo": "ZAPATILLA SALOMON XT-6 GTX UNISEX",
            "marca": "SALOMON",
            "subtitulo": "Adulto unisex | 3 colores",
            "valor": 219990,
            "precio": 219990,
            "precioOriginal": null,
            "descuento": null,
            "badge": "FY EXCLUSIVE",
            "categoria": "unisex",
            "colores": 3,
            "imagen": "../imagenes/salomon_xt6.jpg",
            "img": "../imagenes/salomon_xt6.jpg",
            "descripcion": "Ícono del trail running y la moda técnica contemporánea. Membrana impermeable GORE-TEX y chasis ACS para estabilidad insuperable.",
            "tallas": [38, 39, 40, 41, 42, 43]
        },
        {
            "id": 3,
            "nombre": "Zapatilla Nike Dunk Low Retro BTTYS Hombre",
            "titulo": "ZAPATILLA NIKE NIKE DUNK LOW RETRO BTTYS HOMBRE",
            "marca": "NIKE",
            "subtitulo": "Hombre | 3 colores",
            "valor": 122990,
            "precio": 122990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "hombre",
            "colores": 3,
            "imagen": "../imagenes/Dunk Low.jpg",
            "img": "../imagenes/Dunk Low.jpg",
            "descripcion": "Nacida en el básquetbol universitario de los 80, convertida en el estándar del calzado urbano con cuero premium y suela duradera.",
            "tallas": [38, 39, 40, 41, 42, 43, 44]
        },
        {
            "id": 4,
            "nombre": "Zapatilla Jordan Spizike Hombre",
            "titulo": "Zapatilla JORDAN SPIZIKE HOMBRE",
            "marca": "JORDAN",
            "subtitulo": "Hombre | 1 color",
            "valor": 149990,
            "precio": 149990,
            "precioOriginal": 172990,
            "descuento": "13% OFF",
            "badge": null,
            "categoria": "hombre",
            "colores": 1,
            "imagen": "../imagenes/jordan_spizike.jpg",
            "img": "../imagenes/jordan_spizike.jpg",
            "descripcion": "Tributo a Spike Lee y su histórica alianza con Jordan Brand. Combina características del AJ3, AJ4, AJ5 y AJ6.",
            "tallas": [40, 41, 42, 43, 44]
        },
        {
            "id": 5,
            "nombre": "Bototo Timberland Premium 6\" Waterproof Mujer",
            "titulo": "BOTOTO TIMBERLAND PREMIUM 6\" WATERPROOF MUJER",
            "marca": "Timberland",
            "subtitulo": "Mujer | 1 color",
            "valor": 209990,
            "precio": 209990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "mujer",
            "colores": 1,
            "imagen": "../imagenes/timberland_boot.jpg",
            "img": "../imagenes/timberland_boot.jpg",
            "descripcion": "El clásico e inconfundible bototo amarillo impermeable con cuero nubuck premium, aislamiento PrimaLoft y suela de tracción rugosa.",
            "tallas": [36, 37, 38, 39, 40]
        },
        {
            "id": 6,
            "nombre": "Zapatilla Adidas Superstar ST Unisex",
            "titulo": "ZAPATILLA ADIDAS SUPERSTAR ST UNISEX",
            "marca": "ADIDAS",
            "subtitulo": "Adulto unisex | 4 colores",
            "valor": 99990,
            "precio": 99990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "unisex",
            "colores": 4,
            "imagen": "../imagenes/adidas_superstar.jpg",
            "img": "../imagenes/adidas_superstar.jpg",
            "descripcion": "Más de 50 años de historia con su icónica puntera de goma 'Shell Toe' y tres franjas dentadas en gamuza y cuero suave.",
            "tallas": [37, 38, 39, 40, 41, 42, 43]
        },
        {
            "id": 7,
            "nombre": "Air Jordan 11 Retro Low Hombre",
            "titulo": "AIR JORDAN 11 RETRO LOW HOMBRE",
            "marca": "JORDAN",
            "subtitulo": "Hombre | 2 colores",
            "valor": 189990,
            "precio": 189990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "hombre",
            "colores": 2,
            "imagen": "../imagenes/retro11.jpg",
            "img": "../imagenes/retro11.jpg",
            "descripcion": "El legendario diseño con charol brillante y suela translúcida que definió la temporada histórica de 1996.",
            "tallas": [40, 41, 42, 43, 44, 45]
        },
        {
            "id": 8,
            "nombre": "Zapatilla Nike Air Force 1 '07 Unisex",
            "titulo": "ZAPATILLA NIKE AIR FORCE 1 '07 UNISEX",
            "marca": "NIKE",
            "subtitulo": "Adulto unisex | 2 colores",
            "valor": 119990,
            "precio": 119990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "unisex",
            "colores": 2,
            "imagen": "../imagenes/nikeff1.jpg",
            "img": "../imagenes/nikeff1.jpg",
            "descripcion": "El fulgor sigue vivo con las zapatillas de baloncesto originales que aportaron la amortiguación de aire a las canchas.",
            "tallas": [38, 39, 40, 41, 42, 43, 44]
        },
        {
            "id": 9,
            "nombre": "Zapatilla Nike Air Max 90 OG Hombre",
            "titulo": "ZAPATILLA NIKE AIR MAX 90 OG HOMBRE",
            "marca": "NIKE",
            "subtitulo": "Hombre | 2 colores",
            "valor": 139990,
            "precio": 139990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "hombre",
            "colores": 2,
            "imagen": "../imagenes/irmax.jpg",
            "img": "../imagenes/irmax.jpg",
            "descripcion": "Amortiguación Max Air visible combinada con superposiciones cosidas y detalles de TPU clásicos de los 90.",
            "tallas": [39, 40, 41, 42, 43, 44]
        },
        {
            "id": 10,
            "nombre": "Zapatilla Nike V2K Run Speed Lace Mujer",
            "titulo": "ZAPATILLA NIKE V2K RUN SPEED LACE MUJER",
            "marca": "NIKE",
            "subtitulo": "Mujer | 2 colores",
            "valor": 129990,
            "precio": 129990,
            "precioOriginal": null,
            "descuento": null,
            "badge": "FY EXCLUSIVE",
            "categoria": "mujer",
            "colores": 2,
            "imagen": "../imagenes/w nike.jpg",
            "img": "../imagenes/w nike.jpg",
            "descripcion": "Estética retro Y2K combinada con amortiguación moderna de doble densidad para el día a día.",
            "tallas": [36, 37, 38, 39, 40]
        },
        {
            "id": 11,
            "nombre": "Zapatilla Adidas Campus 00s Grey Unisex",
            "titulo": "ZAPATILLA ADIDAS CAMPUS 00S GREY UNISEX",
            "marca": "ADIDAS",
            "subtitulo": "Adulto unisex | 3 colores",
            "valor": 99990,
            "precio": 99990,
            "precioOriginal": 119990,
            "descuento": "10% OFF",
            "badge": null,
            "categoria": "unisex",
            "colores": 3,
            "imagen": "../imagenes/adidas_campus.jpg",
            "img": "../imagenes/adidas_campus.jpg",
            "descripcion": "Inspirada en la era skate de los 2000 con lengüeta acolchada, gamuza prémium y cordones anchos.",
            "tallas": [38, 39, 40, 41, 42, 43]
        },
        {
            "id": 12,
            "nombre": "Zapatilla Puma Suede Classic XXI Unisex",
            "titulo": "ZAPATILLA PUMA SUEDE CLASSIC XXI UNISEX",
            "marca": "PUMA",
            "subtitulo": "Adulto unisex | 5 colores",
            "valor": 79990,
            "precio": 79990,
            "precioOriginal": null,
            "descuento": null,
            "badge": null,
            "categoria": "unisex",
            "colores": 5,
            "imagen": "../imagenes/puma_suede.jpg",
            "img": "../imagenes/puma_suede.jpg",
            "descripcion": "El modelo histórico que sacudió la cultura hip-hop y el b-boying desde 1968 con gamuza suave e inigualable confort.",
            "tallas": [38, 39, 40, 41, 42, 43, 44]
        }
    ];

    // ============================================================
    // Helper: Currency Formatter (Chilean Peso CLP)
    // ============================================================
    function formatCLP(val) {
        if (typeof val !== 'number') return '$0';
        return '$' + val.toLocaleString('es-CL');
    }

    // Helper: Image Path Resolver
    function resolveImagePath(img) {
        if (!img) return '../imagenes/nikeff1.jpg';
        const isPages = window.location.pathname.includes('/pages/');
        if (isPages) {
            return img.startsWith('../') ? img : '../' + img;
        } else {
            return img.replace('../', '');
        }
    }

    // Helper: Toast Notifications
    function showToast(message, isPink = true) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${isPink ? 'toast-pink' : ''}`;
        toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================================
    // Load & Render Products
    // ============================================================
    // Check URL parameters (e.g. ?filter=sale or ?search=jordan)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('filter')) {
            activeFilter = urlParams.get('filter').toLowerCase();
        }
        if (urlParams.has('search')) {
            searchQuery = urlParams.get('search');
        }
    } catch (e) {
        console.warn('No se pudieron leer los parámetros de URL:', e);
    }

    fetch('../data/zapatillas.json')
        .then(response => {
            if (!response.ok) throw new Error('Network error loading json');
            return response.json();
        })
        .then(data => {
            allProducts = data;
            renderProducts();
            setupFilterListeners();
        })
        .catch(err => {
            // Fallback for file:// or offline mode
            console.warn('Utilizando catálogo local de respaldo:', err);
            allProducts = fallbackProducts;
            renderProducts();
            setupFilterListeners();
        });

    function getFilteredProducts() {
        return allProducts.filter(product => {
            // 1. Text search filter
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase().trim();
                const matchTitle = product.titulo.toLowerCase().includes(q);
                const matchBrand = product.marca.toLowerCase().includes(q);
                const matchSub = product.subtitulo.toLowerCase().includes(q);
                if (!matchTitle && !matchBrand && !matchSub) return false;
            }

            // 2. Category filter
            if (activeFilter === 'all') return true;

            if (activeFilter === 'hombre') {
                return product.categoria === 'hombre' || 
                       product.subtitulo.toLowerCase().includes('hombre') || 
                       product.categoria === 'unisex';
            }

            if (activeFilter === 'mujer') {
                return product.categoria === 'mujer' || 
                       product.subtitulo.toLowerCase().includes('mujer') || 
                       product.categoria === 'unisex';
            }

            if (activeFilter === 'kids') {
                return product.categoria === 'kids' || 
                       product.subtitulo.toLowerCase().includes('kids') || 
                       product.categoria === 'unisex';
            }

            if (activeFilter === 'accesorios') {
                return product.categoria === 'accesorios';
            }

            if (activeFilter === 'winter') {
                return product.categoria === 'winter' || 
                       product.titulo.toLowerCase().includes('waterproof') || 
                       product.titulo.toLowerCase().includes('gtx') || 
                       product.marca.toLowerCase() === 'timberland' || 
                       product.marca.toLowerCase() === 'salomon';
            }

            if (activeFilter === 'sale') {
                return Boolean(product.descuento) || 
                       (product.precioOriginal && product.precioOriginal > product.precio);
            }

            if (activeFilter === 'marcas') {
                return true;
            }

            return true;
        });
    }

    function renderProducts() {
        if (!gridContainer) return;

        const filtered = getFilteredProducts();

        // Update status text
        if (productCountBadge) {
            productCountBadge.textContent = `${filtered.length} productos`;
        }

        if (filterTitleText) {
            if (searchQuery.trim() !== '') {
                filterTitleText.textContent = `Resultados para: "${searchQuery}"`;
            } else if (activeFilter === 'sale') {
                filterTitleText.textContent = 'Ofertas Especiales 🔥';
            } else if (activeFilter === 'winter') {
                filterTitleText.textContent = 'Colección Winter';
            } else if (activeFilter !== 'all') {
                filterTitleText.textContent = `Categoría: ${activeFilter.toUpperCase()}`;
            } else {
                filterTitleText.textContent = 'Todos los productos';
            }
        }

        if (clearFiltersBtn) {
            clearFiltersBtn.style.display = (activeFilter !== 'all' || searchQuery.trim() !== '') ? 'inline-block' : 'none';
        }

        if (filtered.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #777;">
                    <p style="font-size: 18px; font-weight: 700; color: #111; margin-bottom: 8px;">No encontramos resultados</p>
                    <p style="font-size: 14px;">Intenta buscar con otros términos o limpia los filtros activos.</p>
                </div>
            `;
            return;
        }

        gridContainer.innerHTML = filtered.map(producto => {
            const nombre = producto.nombre || producto.titulo;
            const imagen = producto.imagen || producto.img;
            const valor = producto.valor !== undefined ? producto.valor : producto.precio;
            const imgPath = resolveImagePath(imagen);
            
            // Badge HTML
            let badgeHtml = '';
            if (producto.descuento) {
                badgeHtml = `<span class="card-discount-badge">${producto.descuento}</span>`;
            } else if (producto.badge === 'FY EXCLUSIVE') {
                badgeHtml = `
                    <div class="card-exclusive-badge" title="Exclusivo en FY.NEW.YORK">
                        <span class="badge-initials">FY</span>
                        <span class="badge-text-curved">EXCLUSIVE</span>
                    </div>
                `;
            }

            // Price HTML
            let priceHtml = `<span class="card-price-current">${formatCLP(valor)}</span>`;
            if (producto.precioOriginal) {
                priceHtml += `<span class="card-price-original">${formatCLP(producto.precioOriginal)}</span>`;
            }

            return `
                <article class="product-card" data-id="${producto.id}">
                    <div class="card-img-container">
                        ${badgeHtml}
                        <img class="card-img" src="${imgPath}" alt="${nombre}" loading="lazy">
                        <button class="quick-add-btn" data-action="quick-add" data-id="${producto.id}">
                            Añadir al carrito
                        </button>
                    </div>

                    <div class="card-meta-row">
                        <span class="card-brand">${producto.marca}</span>
                        <span class="card-subinfo">${producto.subtitulo}</span>
                    </div>

                    <h3 class="card-title" title="${nombre}">${nombre}</h3>

                    <div class="card-price-row">
                        ${priceHtml}
                    </div>
                </article>
            `;
        }).join('');
    }

    // ============================================================
    // Filtering & Search Listeners
    // ============================================================
    function setupFilterListeners() {
        // Search Input in Header
        const searchInput = document.getElementById('header-search');
        if (searchInput) {
            if (searchQuery) searchInput.value = searchQuery;
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderProducts();
            });
        }

        // Highlight initial active filter button if any
        if (activeFilter !== 'all') {
            document.querySelectorAll('[data-filter]').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-filter') === activeFilter);
            });
        }

        // Nav Buttons with data-filter
        document.addEventListener('click', (e) => {
            const navBtn = e.target.closest('[data-filter]');
            if (navBtn) {
                e.preventDefault();
                const filter = navBtn.getAttribute('data-filter');
                
                // Toggle or set filter
                if (activeFilter === filter) {
                    activeFilter = 'all';
                } else {
                    activeFilter = filter;
                }

                // Update active classes
                document.querySelectorAll('[data-filter]').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-filter') === activeFilter);
                });

                renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Clear Filters Button
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                activeFilter = 'all';
                searchQuery = '';
                const searchInput = document.getElementById('header-search');
                if (searchInput) searchInput.value = '';
                document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
                renderProducts();
            });
        }
    }

    // ============================================================
    // Product Card Clicks: Quick Add vs Modal Details
    // ============================================================
    if (gridContainer) {
        gridContainer.addEventListener('click', (e) => {
            const quickAddBtn = e.target.closest('[data-action="quick-add"]');
            if (quickAddBtn) {
                e.stopPropagation();
                const id = parseInt(quickAddBtn.getAttribute('data-id'), 10);
                const product = allProducts.find(p => p.id === id);
                if (product) {
                    addToCart(product, 41);
                    openCartDrawer();
                }
                return;
            }

            const card = e.target.closest('.product-card');
            if (card) {
                const id = parseInt(card.getAttribute('data-id'), 10);
                const product = allProducts.find(p => p.id === id);
                if (product) {
                    openProductModal(product);
                }
            }
        });
    }

    // ============================================================
    // Product Modal Logic
    // ============================================================
    function openProductModal(product) {
        if (!modalOverlay || !modalContent) return;
        const nombre = product.nombre || product.titulo;
        const imagen = product.imagen || product.img;
        const valor = product.valor !== undefined ? product.valor : product.precio;
        const imgPath = resolveImagePath(imagen);
        selectedModalSize = product.tallas && product.tallas.length > 0 ? product.tallas[0] : 41;

        let priceHtml = `<span class="modal-price-current">${formatCLP(valor)}</span>`;
        if (product.precioOriginal) {
            priceHtml += `<span class="modal-price-original">${formatCLP(product.precioOriginal)}</span>`;
        }

        const sizes = product.tallas || [38, 39, 40, 41, 42, 43, 44];
        const sizesHtml = sizes.map(sz => `
            <button type="button" class="size-pill ${sz === selectedModalSize ? 'selected' : ''}" data-size="${sz}">
                ${sz} EU
            </button>
        `).join('');

        modalContent.innerHTML = `
            <button class="modal-close-btn" id="modal-close-btn" aria-label="Cerrar">&times;</button>
            <div class="modal-img-col">
                <img class="modal-img" src="${imgPath}" alt="${nombre}">
            </div>
            <div class="modal-info-col">
                <span class="modal-brand">${product.marca} &bull; ${product.subtitulo}</span>
                <h2 class="modal-title">${nombre}</h2>
                <div class="modal-price-row">
                    ${priceHtml}
                </div>
                <p class="modal-desc">${product.descripcion || 'Diseño de alta gama con confección prémium y amortiguación avanzada para máxima comodidad.'}</p>
                
                <span class="modal-sizes-label">Seleccionar Talla</span>
                <div class="sizes-grid" id="modal-sizes-container">
                    ${sizesHtml}
                </div>

                <button class="modal-add-btn" id="modal-add-to-cart-btn">
                    Añadir al Carrito (${formatCLP(valor)})
                </button>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Listeners inside modal
        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', closeProductModal);

        const sizesContainer = document.getElementById('modal-sizes-container');
        if (sizesContainer) {
            sizesContainer.addEventListener('click', (e) => {
                const pill = e.target.closest('.size-pill');
                if (pill) {
                    document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
                    pill.classList.add('selected');
                    selectedModalSize = parseInt(pill.getAttribute('data-size'), 10);
                }
            });
        }

        const modalAddBtn = document.getElementById('modal-add-to-cart-btn');
        if (modalAddBtn) {
            modalAddBtn.addEventListener('click', () => {
                addToCart(product, selectedModalSize);
                closeProductModal();
                openCartDrawer();
            });
        }
    }

    function closeProductModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeProductModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCartDrawer();
        }
    });

    // ============================================================
    // Shopping Cart Logic (Vanilla JS & localStorage)
    // ============================================================
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('fyny_cart')) || [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('fyny_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
        renderCart();
    }

    function addToCart(product, size = 41) {
        const cart = getCart();
        const existingIndex = cart.findIndex(item => item.id === product.id && item.talla === size);
        const nombre = product.nombre || product.titulo;
        const imagen = product.imagen || product.img;
        const valor = product.valor !== undefined ? product.valor : product.precio;

        if (existingIndex > -1) {
            cart[existingIndex].cantidad += 1;
        } else {
            cart.push({
                id: product.id,
                nombre: nombre,
                titulo: nombre,
                marca: product.marca,
                valor: valor,
                precio: valor,
                imagen: imagen,
                img: imagen,
                descripcion: product.descripcion,
                talla: size,
                cantidad: 1
            });
        }

        saveCart(cart);
        showToast(`Agregado: ${nombre} (Talla ${size})`);
    }

    function changeCartItemQty(index, delta) {
        const cart = getCart();
        if (!cart[index]) return;

        cart[index].cantidad += delta;
        if (cart[index].cantidad <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
    }

    function removeCartItem(index) {
        const cart = getCart();
        if (!cart[index]) return;
        cart.splice(index, 1);
        saveCart(cart);
    }

    function renderCart() {
        if (!cartItemsContainer || !cartSubtotalEl) return;

        const cart = getCart();
        const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        cartSubtotalEl.textContent = formatCLP(total);

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <p style="font-size: 15px; font-weight: 700; color: #111; margin-bottom: 6px;">Tu carrito está vacío</p>
                    <p style="font-size: 13px;">Explora el catálogo y añade tus sneakers favoritos.</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cart.map((item, index) => {
            const imgPath = resolveImagePath(item.img);
            return `
                <div class="cart-item">
                    <img class="cart-item-img" src="${imgPath}" alt="${item.titulo}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.titulo}</h4>
                        <p class="cart-item-meta">Talla: ${item.talla} EU &bull; ${item.marca}</p>
                        <p class="cart-item-price">${formatCLP(item.precio)}</p>
                        <div class="cart-item-qty">
                            <button class="qty-btn" data-action="decrease" data-index="${index}">&minus;</button>
                            <span class="qty-val">${item.cantidad}</span>
                            <button class="qty-btn" data-action="increase" data-index="${index}">&plus;</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-action="remove" data-index="${index}" aria-label="Eliminar">&times;</button>
                </div>
            `;
        }).join('');
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return;
            const action = btn.getAttribute('data-action');
            const index = parseInt(btn.getAttribute('data-index'), 10);

            if (action === 'increase') changeCartItemQty(index, 1);
            if (action === 'decrease') changeCartItemQty(index, -1);
            if (action === 'remove') removeCartItem(index);
        });
    }

    function openCartDrawer() {
        renderCart();
        if (cartOverlay && cartDrawer) {
            cartOverlay.classList.add('active');
            cartDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCartDrawer() {
        if (cartOverlay && cartDrawer) {
            cartOverlay.classList.remove('active');
            cartDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Attach open cart to header button (delegated)
    document.addEventListener('click', (e) => {
        if (e.target.closest('#header-cart-btn')) {
            e.preventDefault();
            openCartDrawer();
        }
    });

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega zapatillas antes de pagar.');
                return;
            }
            const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            alert(`¡Gracias por comprar en FY.NEW.YORK!\nTotal: ${formatCLP(total)}\nEn breve recibirás el número de seguimiento.`);
            localStorage.removeItem('fyny_cart');
            saveCart([]);
            closeCartDrawer();
        });
    }

    // Initial cart render
    renderCart();
});
