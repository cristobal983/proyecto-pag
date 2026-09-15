# Resumen del Proyecto: FY.NEW.YORK

Este documento explica cómo funciona la arquitectura y el código de tu tienda en línea desarrollada en Vanilla JS, HTML y CSS.

## 1. Arquitectura General (Vanilla JS)
El proyecto no utiliza frameworks complejos (como React o Angular) ni dependencias de Node.js. Todo está construido con JavaScript nativo (Vanilla JS). Esto significa que las interacciones se logran manipulando directamente el Modelo de Objetos del Documento (DOM) usando funciones como `document.getElementById` o `addEventListener`.

## 2. Archivos Principales

### A. HTML (Estructura)
- **`index.html`**: Es la página de inicio (Hero banner, destacados).
- **`pages/tienda.html`**: Es el catálogo principal donde se muestran todos los productos.
- **`pages/admin.html`**: Es el panel de control exclusivo para administrar el inventario.
- **`pages/login.html` y `registro.html`**: Formularios estáticos para la autenticación de usuarios.

*Nota: Los encabezados (Header) y pie de página (Footer) no están repetidos en cada HTML. En su lugar, hay contenedores vacíos (`<div id="header-container"></div>`) que son rellenados dinámicamente mediante JavaScript.*

### B. CSS (Estilos)
- **`styles/estilos.css`**: Es el archivo único que contiene todos los estilos visuales del proyecto. 
- Utiliza variables CSS (ej. `--pink-accent`) en la pseudo-clase `:root` para mantener la consistencia de los colores.
- Implementa *Media Queries* (`@media (max-width: ...)`) para hacer que la página sea responsiva y se adapte a dispositivos móviles (celulares y tablets).

### C. JavaScript (Lógica y Componentes)
- **`components/header.js`**: Inyecta el código HTML de la barra de navegación superior en todas las páginas. También incluye la lógica del menú hamburguesa para móviles y actualiza el contador del carrito.
- **`components/footer.js`**: Inyecta el pie de página en todas las pantallas.
- **`scripts/scripts.js`**: Contiene la lógica principal de validaciones de formularios (Registro, Login, Contacto), validación de RUT chileno, y carga dinámica de regiones y comunas.
- **`scripts/tienda.js`**: Es el corazón del catálogo. Se encarga de:
  - Leer los productos desde el LocalStorage o el archivo JSON.
  - Filtrar los productos por categoría, marca o barra de búsqueda.
  - Renderizar las tarjetas de los productos dinámicamente en el HTML.
  - Gestionar el Carrito de Compras (Añadir, eliminar, calcular total).
- **`scripts/admin.js`**: Controla el panel de administrador. Permite añadir, editar y eliminar productos.

## 3. Manejo de Datos (Persistencia)
Como el proyecto no tiene una base de datos real en un servidor backend (como SQL o MongoDB), utiliza **LocalStorage**, que es una pequeña base de datos integrada en el navegador web del usuario.

- **Datos Iniciales (`data/zapatillas.json`)**: Contiene la lista original de productos.
- **Flujo de Datos**: 
  1. Cuando entras a la tienda, el sistema busca la variable `fyny_products` en el LocalStorage.
  2. Si no existe (es la primera vez que entras), lee el archivo `zapatillas.json` y guarda esos datos en el LocalStorage.
  3. Si vas al Panel de Administrador (`admin.html`) y editas o creas un producto, el cambio se guarda en el LocalStorage.
  4. La próxima vez que cargues la tienda, leerá los datos actualizados del LocalStorage, permitiendo que la tienda sea dinámica sin necesidad de un servidor complejo.

## 4. El Carrito de Compras
El carrito funciona completamente del lado del cliente.
- Al presionar "Añadir al carrito", el producto se guarda en un arreglo (lista) en el LocalStorage bajo la clave `fyny_cart`.
- Un "Event Listener" global (`window.addEventListener('cartUpdated', ...)`) escucha cada vez que el carrito cambia para actualizar automáticamente la "burbuja" roja con el número de productos en el Header, sin necesidad de recargar la página.

## 5. La Barra de Búsqueda
La barra de búsqueda en el menú de navegación superior permite encontrar productos rápidamente. Funciona con los siguientes eventos:
- Cuando el usuario presiona la tecla Enter (`keydown` event) o hace clic en el ícono de la lupa, se captura el texto escrito mediante `document.getElementById('header-search').value`.
- Luego, se redirige a la página de la tienda pasando el texto como un parámetro en la URL, utilizando `window.location.href = 'tienda.html?search=texto'`.
- Al cargar `tienda.html`, JavaScript lee ese parámetro de la URL (usando `URLSearchParams`) y usa la función de arreglos `filter()` para mostrar únicamente las zapatillas cuyo título o marca coincidan con la búsqueda.

## 6. Animaciones y Efectos Visuales (CSS Hover)
El diseño premium y la interactividad visual de los productos al pasar el mouse por encima no se logran con JavaScript, sino enteramente con CSS, utilizando la pseudo-clase `:hover` y propiedades de transición.
- **Efecto de elevación de la imagen**: Cuando el cursor (mouse) se pone encima de la tarjeta del producto, se activa el selector CSS `.product-card:hover .card-img`. Este usa el comando `transform: scale(1.05);` para hacer que la imagen del producto crezca ligeramente (haciendo un zoom del 5%). Todo esto ocurre de forma suave gracias a la propiedad `transition: transform 0.35s ease`.
- **Botón "Añadir al carrito" rápido**: Por defecto, el botón negro que aparece sobre la imagen tiene `opacity: 0` (es invisible) y `transform: translateY(8px)` (está desplazado hacia abajo). Al poner el mouse encima de la tarjeta, cambia a `opacity: 1` y `transform: translateY(0)`, creando el efecto de que el botón se desliza hacia arriba mágicamente.

## 7. Interacción al hacer clic en un Producto (Modal)
Cuando el usuario presiona sobre un producto en la tienda, ocurre lo siguiente en JavaScript:
- Un "Event Listener" detecta el clic en cualquier elemento que tenga la clase `.product-card`.
- Utiliza la función `parseInt(card.getAttribute('data-id'))` para obtener el ID único de ese producto específico de la tarjeta cliqueada.
- Con ese ID, busca la información completa de la zapatilla en la base de datos (nuestro JSON/LocalStorage) usando la función `allProducts.find(p => p.id === id)`.
- En lugar de cargar una página web completamente nueva, se ejecuta la función `openProductModal(product)`. Esta función toma un contenedor HTML oculto en la página (el Modal de vista rápida) y reemplaza su contenido interno (`innerHTML`) con la imagen, título, descripción y botones de tallas de ese producto específico.
- Finalmente, se le añade la clase `.active` al modal, lo que cambia su estilo CSS a `opacity: 1; visibility: visible;` para que aparezca en el centro de la pantalla sobre un fondo oscuro, permitiendo al usuario seleccionar la talla y añadirlo al carrito sin salir del catálogo.
