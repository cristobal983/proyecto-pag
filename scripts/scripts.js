document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // FUNCIONES AUXILIARES DE VALIDACIÓN
    // ==========================================

    // Validar Dominios Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
    function validarDominioEmail(email) {
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const emailLimpio = email.trim().toLowerCase();
        return dominiosPermitidos.some(dom => emailLimpio.endsWith(dom)) && emailLimpio.length <= 100;
    }

    // Validar RUN Chileno (entre 7 y 9 caracteres, sin puntos ni guion)
    function validarRunChileno(run) {
        const cleanRun = run.trim().toUpperCase();
        if (!/^[0-9]{7,8}[0-9K]{1}$/.test(cleanRun)) return false;

        const cuerpo = cleanRun.slice(0, -1);
        const dvIngresado = cleanRun.slice(-1);

        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += multiplo * parseInt(cuerpo.charAt(i), 10);
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        let dvEsperado = 11 - (suma % 11);
        if (dvEsperado === 11) dvEsperado = '0';
        else if (dvEsperado === 10) dvEsperado = 'K';
        else dvEsperado = dvEsperado.toString();

        return dvIngresado === dvEsperado;
    }

    // Función genérica para mostrar/ocultar errores en la interfaz
    function aplicarEstadoCampo(input, esValido, idError) {
        const errorP = document.getElementById(idError);
        if (input) {
            if (esValido) {
                input.classList.remove('is-danger');
                input.classList.add('is-success');
                if (errorP) errorP.classList.add('is-hidden');
            } else {
                input.classList.remove('is-success');
                input.classList.add('is-danger');
                if (errorP) errorP.classList.remove('is-hidden');
            }
        }
        return esValido;
    }

    // ==========================================
    // 1. CARGA DINÁMICA DE REGIÓN Y COMUNA
    // ==========================================
    const selectRegion = document.getElementById('selectRegion');
    const selectComuna = document.getElementById('selectComuna');

    const coberturaChile = [
        { region: "Región Metropolitana", comunas: ["Santiago", "Estación Central", "Maipú", "Puente Alto"] },
        { region: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
        { region: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles"] }
    ];

    if (selectRegion && selectComuna) {
        selectRegion.innerHTML = '<option value="">Seleccione Región</option>';
        coberturaChile.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.region;
            opt.textContent = item.region;
            selectRegion.appendChild(opt);
        });

        selectRegion.addEventListener('change', (e) => {
            const regionSeleccionada = coberturaChile.find(r => r.region === e.target.value);
            selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';

            if (regionSeleccionada) {
                regionSeleccionada.comunas.forEach(comuna => {
                    const opt = document.createElement('option');
                    opt.value = comuna;
                    opt.textContent = comuna;
                    selectComuna.appendChild(opt);
                });
            }
            aplicarEstadoCampo(selectRegion, e.target.value !== '', 'err-region');
        });

        selectComuna.addEventListener('change', (e) => {
            aplicarEstadoCampo(selectComuna, e.target.value !== '', 'err-comuna');
        });
    }

    // ==========================================
    // 2. VALIDACIÓN DEL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('formRegistro');

    if (formRegistro) {
        const inputRun = document.getElementById('run');
        const inputNombre = document.getElementById('nombre');
        const inputApellidos = document.getElementById('apellidos');
        const inputEmail = document.getElementById('email');
        const inputDireccion = document.getElementById('direccion');

        // Escuchadores en tiempo real
        if (inputRun) inputRun.addEventListener('input', () => aplicarEstadoCampo(inputRun, validarRunChileno(inputRun.value), 'err-run'));
        if (inputNombre) inputNombre.addEventListener('input', () => aplicarEstadoCampo(inputNombre, inputNombre.value.trim().length > 0 && inputNombre.value.trim().length <= 50, 'err-nombre'));
        if (inputApellidos) inputApellidos.addEventListener('input', () => aplicarEstadoCampo(inputApellidos, inputApellidos.value.trim().length > 0 && inputApellidos.value.trim().length <= 100, 'err-apellidos'));
        if (inputEmail) inputEmail.addEventListener('input', () => aplicarEstadoCampo(inputEmail, validarDominioEmail(inputEmail.value), 'err-email'));
        if (inputDireccion) inputDireccion.addEventListener('input', () => aplicarEstadoCampo(inputDireccion, inputDireccion.value.trim().length > 0 && inputDireccion.value.trim().length <= 300, 'err-direccion'));

        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const vRun = aplicarEstadoCampo(inputRun, validarRunChileno(inputRun.value), 'err-run');
            const vNom = aplicarEstadoCampo(inputNombre, inputNombre.value.trim().length > 0 && inputNombre.value.trim().length <= 50, 'err-nombre');
            const vApe = aplicarEstadoCampo(inputApellidos, inputApellidos.value.trim().length > 0 && inputApellidos.value.trim().length <= 100, 'err-apellidos');
            const vEma = aplicarEstadoCampo(inputEmail, validarDominioEmail(inputEmail.value), 'err-email');
            const vReg = aplicarEstadoCampo(selectRegion, selectRegion.value !== '', 'err-region');
            const vCom = aplicarEstadoCampo(selectComuna, selectComuna.value !== '', 'err-comuna');
            const vDir = aplicarEstadoCampo(inputDireccion, inputDireccion.value.trim().length > 0 && inputDireccion.value.trim().length <= 300, 'err-direccion');

            if (vRun && vNom && vApe && vEma && vReg && vCom && vDir) {
                alert('¡Usuario registrado con éxito!');
                formRegistro.reset();
                window.location.href = 'login.html';
            }
        });
    }

    // ==========================================
    // 3. VALIDACIÓN DEL FORMULARIO DE LOGIN
    // ==========================================
    const loginForm = document.getElementById('formLogin');

    if (loginForm) {
        const inputEmail = document.getElementById('loginEmail');
        const inputPass = document.getElementById('loginPassword');

        if (inputEmail) {
            inputEmail.addEventListener('input', () => {
                aplicarEstadoCampo(inputEmail, validarDominioEmail(inputEmail.value), 'err-login-email');
            });
        }

        if (inputPass) {
            inputPass.addEventListener('input', () => {
                const len = inputPass.value.trim().length;
                aplicarEstadoCampo(inputPass, len >= 4 && len <= 10, 'err-login-password');
            });
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const eCorrecto = aplicarEstadoCampo(inputEmail, validarDominioEmail(inputEmail.value), 'err-login-email');
            const passLen = inputPass.value.trim().length;
            const pCorrecto = aplicarEstadoCampo(inputPass, passLen >= 4 && passLen <= 10, 'err-login-password');

            if (eCorrecto && pCorrecto) {
                alert('¡Inicio de sesión exitoso!');
                loginForm.reset();
                window.location.href = 'tienda.html';
            }
        });
    }

    // ==========================================
    // 4. VALIDACIÓN FORMULARIO CONTACTO
    // ==========================================
    const formContacto = document.getElementById('formContacto');

    if (formContacto) {
        const inputNombre = document.getElementById('contactoNombre');
        const inputEmail = document.getElementById('contactoEmail');
        const inputComentario = document.getElementById('contactoComentario');

        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();

            const vNom = aplicarEstadoCampo(inputNombre, inputNombre.value.trim().length > 0 && inputNombre.value.trim().length <= 100, 'err-contacto-nombre');
            const vEma = aplicarEstadoCampo(inputEmail, validarDominioEmail(inputEmail.value), 'err-contacto-email');
            const vCom = aplicarEstadoCampo(inputComentario, inputComentario.value.trim().length > 0 && inputComentario.value.trim().length <= 500, 'err-contacto-comentario');

            if (vNom && vEma && vCom) {
                alert('¡Mensaje de contacto enviado con éxito!');
                formContacto.reset();
            }
        });
    }
});