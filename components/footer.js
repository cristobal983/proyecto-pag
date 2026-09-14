document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="brand-logo" style="font-size: 20px;">
                        <span class="logo-part-fy">FY.</span><span class="logo-part-ny">NEW.YORK</span>
                    </div>
                    <div class="footer-links">
                        <a href="#">Marcas</a>
                        <a href="#">Tiendas</a>
                        <a href="#">Términos y Condiciones</a>
                        <a href="#">Políticas de Devolución</a>
                        <a href="#">Preguntas Frecuentes</a>
                        <a href="#">Contacto</a>
                    </div>
                    <p style="color: #999; font-size: 11px;">
                        &copy; 2026 FY.NEW.YORK. Todos los derechos reservados. Precios válidos para compras en línea.
                    </p>
                </div>
            </footer>
        `;
    }
});
