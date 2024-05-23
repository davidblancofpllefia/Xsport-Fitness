import { proyectos } from '../bd/datosPrueba'
import { ls } from '../componentes/funciones'
import { Proyecto } from '../bd/proyecto'

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
    
    <!-- Tabla de proyectos -->
    <div id="tabTabla" class="col-12 d-none d-xl-block" style="overflow-x: auto">
      <table
        class="table table-hover align-middle mt-3"
        style="min-width: 1000px"
      >
        <thead>
          <tr>
            <th></th>
            <th>
              Nombre <span><i class="bi bi-caret-down"></i></span>
            </th>
            <th>
              Descripción <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>
              Enlace <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>Repositorio</th>
            <th>
              Autor <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>
              Fecha <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>
              Estado <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tbodyProyectos">
          <!-- Aqui van los datos generados por la lógica -->
          
        </tbody>
      </table>
    </div>

    <!-- Panel de tarjetas -->
    <div id="tabTarjetas" class="d-xl-none row">
      <!-- Aqui van los datos generados por la lógica -->
     
    </div>
  </div>
</div>
  `,
  script: async () => {
    // Obtiene la información del usuario
    const usuario = ls.getUsuario();

    // Obtenemos todos los datos de la tabla de ejercicios desde Supabase
    let { data: ejercicios, error } = await supabase
    .from('ejercicios')
    .select('*');

    if (error) {
      console.error('Error obteniendo los ejercicios:', error.message);
      return;
    }


// Obtener datos de proyectos desde Supabase
// Obtener datos de ejercicios desde Supabase
const obtenerEjercicios = async () => {
  try {
    const { data: ejercicios, error } = await supabase
      .from('ejercicios')
      .select('*');

    if (error) {
      console.error('Error al obtener los ejercicios:', error.message);
      return [];
    }

    return ejercicios;
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error.message);
    return [];
  }
};

// Función para pintar los ejercicios en la vista de tabla
const pintarEjerciciosTabla = (ejercicios) => {
  const tbodyEjercicios = document.getElementById('tbodyEjercicios');
  tbodyEjercicios.innerHTML = '';

  ejercicios.forEach(ejercicio => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ejercicio.titulo}</td>
      <td>${ejercicio.descripcion}</td>
      <td>${ejercicio.duracion}</td>
      <td>${ejercicio.categoria}</td>
      <td>${ejercicio.nivel}</td>
      <td>${ejercicio.fecha}</td>
      <td>
        <!-- Botones de edición y borrado -->
        <button class="botonEditar btn btn-sm btn-outline-primary bi bi-pencil" data-id="${ejercicio.id}"></button>
        <button class="botonBorrar btn btn-sm btn-outline-danger bi bi-trash3" data-id="${ejercicio.id}"></button>
      </td>
    `;
    tbodyEjercicios.appendChild(tr);
  });
};

// Función para inicializar la vista de ejercicios
const inicializarVistaEjercicios = async () => {
  const ejercicios = await obtenerEjercicios();
  pintarEjerciciosTabla(ejercicios);
};

// Llamar a la función de inicialización al cargar la página
window.addEventListener('load', inicializarVistaEjercicios);

// Agregar listeners de eventos para botones de edición y borrado (usando delegación de eventos)
document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('botonEditar')) {
    const id = event.target.dataset.id;
    // Redirigir a la vista para editar el ejercicio con el ID proporcionado
    window.location.href = `#/ejercicioEditar/${id}`;
  } else if (event.target.classList.contains('botonBorrar')) {
    const id = event.target.dataset.id;
    const confirmacion = confirm(`¿Estás seguro de que deseas borrar el ejercicio con ID ${id}?`);
    if (confirmacion) {
      // Realizar la operación de borrado (llamada a Supabase u otro método)
      const { error } = await supabase
        .from('ejercicios')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error al borrar el ejercicio:', error.message);
        // Aquí puedes mostrar un mensaje de error o manejar la situación de otra manera
      } else {
        // Actualizar la vista de ejercicios después del borrado
        inicializarVistaEjercicios();
      }
    }
  }
});

 }
}