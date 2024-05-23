
import { supabase } from "../bd/supabase";
import { ls } from '../componentes/funciones'

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">Proyectos</h1>
  <div class="row mt-5">
    <div class="col-12">
      <!--nav-tabs-->
      <ul class="nav nav-tabs">
        <!--Etiqueta Todos los proyectos-->
        <li class="nav-item w-50">
          <button 
            class="selectorFicha fichaProyectos nav-link w-100 active"
          >
            Todos los proyectos
          </button>
        </li>
        <!--Etiqueta Mis proyectos-->
        <li id="pestanyaMisProyectos" class="nav-item w-50">
          <button 
            class="selectorFicha fichaMisProyectos nav-link w-100"
          >
            Mis proyectos
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="border border-top-0 p-3">
    <div class="row">
      <div class="col-12 col-sm-4 mb-3">
      <!-- Boton para subir proyectos -->
        <a id="botonSubirProyecto" href="#/proyectoNuevo" class="btn btn-primary w-100 router-link">Subir proyecto</a>
      </div>
      <div class="d-flex col-12 col-sm-8 mb-3">
        <!-- Botones para alternar entre vista de tabla o de tarjetas -->
        <button class="vistaTabla btn btn-secondary me-2 bi bi-list">
        </button>
        <button class="vistaTarjetas btn btn-secondary me-2 bi bi-grid-3x3-gap ">
        </button>
        <!-- Buscador -->
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="bi bi-search"></i
          ></span>
          <input
            id="inputBusqueda"
            type="text"
            class="form-control"
            placeholder="Buscador"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
          <span class="input-group-text" id="addon-wrapping"
            ><i id="borrarBuscador" class="bi bi-x"></i
          ></span>
        </div>
      </div>
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

 // Verifica si el usuario no está autenticado o es un usuario registrado
 if (!usuario || usuario.rol === 'registrado') {
  // Redirige a la página de registro
  window.location = '#/home';
  return;
}

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
             window.location = '#/registro';
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