document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const isRoot = !window.location.pathname.includes('/pages/');
        const basePath = isRoot ? '' : '../';

        headerContainer.innerHTML = `
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="${basePath}index.html">
                        <strong class="is-size-4">SNEAKERS STORE</strong>
                    </a>
                </div>

                <div class="navbar-menu is-active">
                    <div class="navbar-start">
                        <a href="${basePath}index.html" class="navbar-item">Inicio</a>
                        <a href="${basePath}pages/tienda.html" class="navbar-item">Catálogo</a>
                    </div>

                    <div class="navbar-end">  
                        <div class="buttons">
                            <a href="${basePath}pages/regiter.html" class="button is-dark">
                                <strong>Registrarse</strong>
                            </a>
                            <a href="${basePath}pages/login.html" class="button is-light">
                                Iniciar Sesión
                            </a>
                            <a href="${basePath}pages/profile.html" class="button is-primary is-light">
                                Mi Perfil
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
});
