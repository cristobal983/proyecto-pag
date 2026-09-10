document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer mt-6">
                <div class="content has-text-centered">
                    <p>
                        <strong>Sneakers Store</strong> — &copy; 2026 Todos los derechos reservados.
                    </p>

                    <!-- Enlaces directos -->
                    <div class="buttons is-centered mt-2">
                        <a class="button is-small is-ghost" href="#">Términos y Condiciones</a>
                        <a class="button is-small is-ghost" href="#">Política de Privacidad</a>
                        <a class="button is-small is-ghost" href="#">Contacto / Soporte</a>
                    </div>

                    <p class="is-size-7 has-text-grey mt-2">
                        Este es un sitio web de demostración para venta de calzado deportivo. Envíos a todo el país y devoluciones gratuitas.
                    </p>
                </div>
            </footer>
        `;
    }
});
