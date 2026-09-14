// Validación de dominios de correo permitidos
function validarCorreo(correo) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => correo.endsWith(dominio));
}

// Validación de RUT/RUN chileno sin puntos ni guion
function validarRun(run) {
    if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(run)) return false;
    const cuerpo = run.slice(0, -1);
    let dv = run.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i));
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvEsperado;
}

// Carga Dinámica de Regiones y Comunas
const coberturaChile = [
    { region: "Región Metropolitana", comunas: ["Santiago", "Estación Central", "Maipú", "Puente Alto"] },
    { region: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] }
];

function inicializarSelectsUbicacion() {
    const selectRegion = document.getElementById('select-region');
    const selectComuna = document.getElementById('select-comuna');
    if (!selectRegion || !selectComuna) return;

    selectRegion.innerHTML = '<option value="">Seleccione Región</option>';
    coberturaChile.forEach(item => {
        const option = document.createElement('option');
        option.value = item.region;
        option.textContent = item.region;
        selectRegion.appendChild(option);
    });

    selectRegion.addEventListener('change', (e) => {
        const regionSel = coberturaChile.find(r => r.region === e.target.value);
        selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';
        if (regionSel) {
            regionSel.comunas.forEach(comuna => {
                const opt = document.createElement('option');
                opt.value = comuna;
                opt.textContent = comuna;
                selectComuna.appendChild(opt);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', inicializarSelectsUbicacion);