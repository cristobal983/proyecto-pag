document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. VALIDACIÓN DEL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('formRegistro');

    if (formRegistro) {
        const inputUser = document.getElementById('username');
        const inputEmail = document.getElementById('email');
        const inputPass = document.getElementById('password');

        // Expresiones regulares
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexUser = /^[a-zA-Z0-9]{4,15}$/;
        const regexPass = /^(?=.*\d).{6,}$/; // Al menos 6 caracteres y 1 número

        function validarCampo(input, condicionValida, idError) {
            const errorP = document.getElementById(idError);
            if (condicionValida) {
                input.classList.remove('is-danger');
                input.classList.add('is-success');
                errorP.classList.add('is-hidden');
                return true;
            } else {
                input.classList.remove('is-success');
                input.classList.add('is-danger');
                errorP.classList.remove('is-hidden');
                return false;
            }
        }

        // Eventos en tiempo real
        inputUser.addEventListener('input', () => {
            validarCampo(inputUser, regexUser.test(inputUser.value.trim()), 'err-username');
        });

        inputEmail.addEventListener('input', () => {
            validarCampo(inputEmail, regexEmail.test(inputEmail.value.trim()), 'err-email');
        });

        inputPass.addEventListener('input', () => {
            validarCampo(inputPass, regexPass.test(inputPass.value), 'err-password');
        });

        // Enviar formulario de registro
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const uValido = validarCampo(inputUser, regexUser.test(inputUser.value.trim()), 'err-username');
            const eValido = validarCampo(inputEmail, regexEmail.test(inputEmail.value.trim()), 'err-email');
            const pValido = validarCampo(inputPass, regexPass.test(inputPass.value), 'err-password');

            if (uValido && eValido && pValido) {
                alert('¡Registro exitoso! Bienvenido a Sneakers Store.');
                formRegistro.reset();
                inputUser.classList.remove('is-success');
                inputEmail.classList.remove('is-success');
                inputPass.classList.remove('is-success');
                
                // Redirigir al inicio de sesión
                window.location.href = 'login.html';
            }
        });
    }

    // ==========================================
    // 2. VALIDACIÓN DEL FORMULARIO DE LOGIN
    // ==========================================
    const loginForm = document.getElementById('formLogin');

    if (loginForm) {
        const inputEmail = document.getElementById('loginEmail');
        const inputPass = document.getElementById('loginPassword');

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function validarControl(input, esValido, idError) {
            const errorElemento = document.getElementById(idError);
            if (esValido) {
                input.classList.remove('is-danger');
                input.classList.add('is-success');
                errorElemento.classList.add('is-hidden');
                return true;
            } else {
                input.classList.remove('is-success');
                input.classList.add('is-danger');
                errorElemento.classList.remove('is-hidden');
                return false;
            }
        }

        // Eventos en tiempo real
        inputEmail.addEventListener('input', () => {
            const emailValido = regexEmail.test(inputEmail.value.trim());
            validarControl(inputEmail, emailValido, 'err-login-email');
        });

        inputPass.addEventListener('input', () => {
            const passValido = inputPass.value.trim().length >= 6;
            validarControl(inputPass, passValido, 'err-login-password');
        });

        // Enviar formulario de inicio de sesión
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailCorrecto = validarControl(
                inputEmail,
                regexEmail.test(inputEmail.value.trim()),
                'err-login-email'
            );

            const passCorrecto = validarControl(
                inputPass,
                inputPass.value.trim().length >= 6,
                'err-login-password'
            );

            if (emailCorrecto && passCorrecto) {
                alert('¡Inicio de sesión exitoso! Redirigiendo a tu perfil...');
                loginForm.reset();
                inputEmail.classList.remove('is-success');
                inputPass.classList.remove('is-success');
                
                // Redirección directa al perfil dentro de la misma carpeta /pages/
                window.location.href = 'profile.html';
            }
        });
    }
});