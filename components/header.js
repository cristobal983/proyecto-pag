document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const isRoot = !window.location.pathname.includes('/pages/');
        const isTienda = window.location.pathname.endsWith('tienda.html');
        const basePath = isRoot ? '' : '../';

        headerContainer.innerHTML = `
            <header class="site-header">
                <div class="header-container">
                    <!-- Logo FY.NEW.YORK -->
                    <a class="logo-container" href="${basePath}pages/tienda.html" id="nav-logo">
                        <span class="brand-logo">
                            <span class="logo-part-fy">FY.</span><span class="logo-part-ny">NEW.YORK</span>
                        </span>
                    </a>

                    <!-- Burger Menu Button (Mobile Only) -->
                    <button class="burger-menu-btn" id="burger-btn" aria-label="Menú">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <!-- Navigation Menu -->
                    <nav>
                        <ul class="nav-menu">
                            <li><button class="nav-link" data-filter="marcas">MARCAS</button></li>
                            <li><button class="nav-link" data-filter="hombre">HOMBRE</button></li>
                            <li><button class="nav-link" data-filter="mujer">MUJER</button></li>
                            <li><button class="nav-link" data-filter="kids">KIDS</button></li>
                            <li><button class="nav-link" data-filter="accesorios">ACCESORIOS</button></li>
                            <li><button class="nav-link nav-btn-winter" data-filter="winter">WINTER</button></li>
                            <li><button class="nav-link nav-btn-sale" data-filter="sale">SALE 🔥</button></li>
                        </ul>
                    </nav>

                    <!-- Utility Actions: Search, Account, Cart -->
                    <div class="header-actions">
                        <div class="search-wrapper">
                            <input type="text" id="header-search" class="search-input" placeholder="Buscar" autocomplete="off">
                            <button class="search-icon-btn" id="search-btn" aria-label="Buscar">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>

                        <a href="${basePath}pages/admin.html" class="action-icon-btn" title="Panel Administrador" id="btn-admin">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                        </a>

                        <a href="${basePath}pages/login.html" class="action-icon-btn" title="Mi Cuenta" id="btn-user-account">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </a>

                        <button class="action-icon-btn" id="header-cart-btn" title="Carrito de Compras" aria-label="Carrito de compras">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <span id="header-cart-badge" class="cart-counter">0</span>
                        </button>
                    </div>
                </div>
            </header>
        `;

        // Cross-page navigation for nav links when not on tienda.html
        if (!isTienda) {
            document.querySelectorAll('.nav-link[data-filter]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const filter = btn.getAttribute('data-filter');
                    window.location.href = `${basePath}pages/tienda.html?filter=${filter}`;
                });
            });

            const searchInput = document.getElementById('header-search');
            if (searchInput) {
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                        window.location.href = `${basePath}pages/tienda.html?search=${encodeURIComponent(searchInput.value.trim())}`;
                    }
                });
            }

            const searchBtn = document.getElementById('search-btn');
            if (searchBtn && searchInput) {
                searchBtn.addEventListener('click', () => {
                    if (searchInput.value.trim() !== '') {
                        window.location.href = `${basePath}pages/tienda.html?search=${encodeURIComponent(searchInput.value.trim())}`;
                    }
                });
            }
        }

        // Update cart badge from localStorage
        const updateHeaderCartBadge = () => {
            const badge = document.getElementById('header-cart-badge');
            if (badge) {
                try {
                    const cart = JSON.parse(localStorage.getItem('fyny_cart') || '[]');
                    const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 1), 0);
                    badge.textContent = totalItems;
                    badge.style.display = totalItems > 0 ? 'flex' : 'none';
                } catch {
                    badge.style.display = 'none';
                }
            }
        };

        updateHeaderCartBadge();
        window.addEventListener('cartUpdated', updateHeaderCartBadge);

        // Burger menu logic
        const burgerBtn = document.getElementById('burger-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (burgerBtn && navMenu) {
            burgerBtn.addEventListener('click', () => {
                navMenu.classList.toggle('menu-open');
                const isOpen = navMenu.classList.contains('menu-open');
                
                // Animar el icono del burger
                if (isOpen) {
                    burgerBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>`;
                } else {
                    burgerBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>`;
                }
            });

            // Cerrar menú al hacer click en un enlace
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 880) {
                        navMenu.classList.remove('menu-open');
                        burgerBtn.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>`;
                    }
                });
            });
        }
    }
});
