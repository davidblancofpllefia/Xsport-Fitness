import { supabase } from "../bd/supabase";
import { ls } from '../componentes/funciones'


export default {
  template: //html
  `
  <div class="imagenFondo d-flex align-items-center">
  <div class="container">
      <div class="textoInicio bg-light p-4 bg-opacity-75">
          <h1 class="fw-bolder my-3">¡Bienvenido!</h1>
          <p class="fw-normal">
          ¡Bienvenido a nuestro sitio de fitness! Aquí encontrarás todo lo que necesitas para alcanzar tus objetivos de salud y bienestar. ¡Comienza hoy mismo y descubre una nueva versión de ti mismo!
          </p>
      </div>
  </div>
</div>
<div class="container mt-4">
  <!-- Buscador y botón -->
  <div class="row align-items-center">
      <div class="col">
          <div class="input-group flex-nowrap w-50">
              <span class="input-group-text" id="addon-wrapping">
                  <i class="bi bi-search"></i>
              </span>
              <input
                  id="inputBusqueda"
                  type="text"
                  class="form-control"
                  placeholder="Buscador"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
              />
              <span class="input-group-text" id="addon-wrapping">
                  <i id="borrarBuscador" class="bi bi-x"></i>
              </span>
          </div>
      </div>
      <div class="col-auto">
          <button id="botonAgregar" class="btn btn-primary mt-3">Añadir</button>
      </div>
  </div>
</div>
<div class="container d-flex flex-wrap mt-5 col-sm-12" id="ejerciciosContainer">
  <!-- Aquí se pintarán los ejercicios -->
</div>

  `,
  script: async () => {
       // Obtiene la información del usuario
    const usuario = ls.getUsuario();

    if (!usuario ||usuario.rol === 'registrado') {
        document.getElementById('botonAgregar').style.display = 'none';
      }
      // Obtenemos los datos de la tabla de ejercicios desde Supabase
      let { data: ejercicios, error } = await supabase
          .from('ejercicios')
          .select('*');

      if (error) {
          console.error('Error obteniendo los ejercicios:', error.message);
          return;
      }

     // Función para pintar los ejercicios en la vista
const pintarEjercicios = () => {
    const ejerciciosContainer = document.getElementById('ejerciciosContainer');
    ejerciciosContainer.innerHTML = ejercicios.map(ejercicio => `
        <div class="card me-4 mb-4" style="width: 18rem;" data-id="${ejercicio.id}">
            <button type="button" class="btn p-0">
                <img src="${ejercicio.foto}" class="card-img-top" alt="...">
            </button>
            <div class="card-body p-2">
                <h5 class="card-title">${ejercicio.titulo}</h5>
            </div>
        </div>
    `).join('');

    // Agregar listeners de clic a las nuevas tarjetas de ejercicio
    ejerciciosContainer.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            // Verifica si el usuario está logueado
            if (usuario) {
                window.location = `#/proyectoDetalle/${id}`;
            } else {
                // Si el usuario no está logueado, redirige a la página de registro
                window.location = '#/login';
            }
        });
    });
};

// Función para filtrar los ejercicios
const filtrarEjercicios = (texto) => {
    const ejerciciosContainer = document.getElementById('ejerciciosContainer');
    ejerciciosContainer.innerHTML = ejercicios
        .filter(ejercicio => ejercicio.titulo.toLowerCase().includes(texto.toLowerCase()))
        .map(ejercicio => `
            <div class="card me-4 mb-4" style="width: 18rem;" data-id="${ejercicio.id}">
                <button type="button" class="btn p-0">
                    <img src="${ejercicio.foto}" class="card-img-top" alt="...">
                </button>
                <div class="card-body p-2">
                    <h5 class="card-title">${ejercicio.titulo}</h5>
                </div>
            </div>
        `).join('');

    // Agregar listeners de clic a las nuevas tarjetas de ejercicio
    ejerciciosContainer.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            // Verifica si el usuario está logueado
            if (usuario) {
                window.location = `#/proyectoDetalle/${id}`;
            } else {
                // Si el usuario no está logueado, redirige a la página de registro
                window.location = '#/registro';
            }
        });
    });
};

// Pintamos los ejercicios al cargar la página
pintarEjercicios();

// Listener para borrar el contenido del buscador
document.getElementById('borrarBuscador').addEventListener('click', () => {
    document.getElementById('inputBusqueda').value = '';
    pintarEjercicios();
});

// Listener para filtrar ejercicios mientras se escribe en el buscador
document.getElementById('inputBusqueda').addEventListener('input', (event) => {
    filtrarEjercicios(event.target.value);
});

// Obtener el botón "Añadir"
const botonAgregar = document.getElementById('botonAgregar');

// Evento de clic para el botón "Añadir"
botonAgregar.addEventListener('click', () => {
    // Redirigir a la vista para agregar un nuevo ejercicio
    window.location = '#/proyectoNuevo'; 
});


  }
}