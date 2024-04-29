import { supabase } from '../bd/supabase';

export default {
  template: `
    <div class="container" id="ejercicioDetalleContainer">
      <!-- Contenido del ejercicio detallado se inyectará aquí -->
    </div>
  `,
  script: async () => {
    const segments = window.location.hash.split('/'); // Dividir la URL en segmentos
    const idString = segments[segments.length - 1]; // Obtener el último segmento que debería contener el ID
    const id = parseInt(idString); // Convertir el ID a un número entero

    if (isNaN(id)) {
        console.error('ID no válido:', idString);
        // Podemos redirigir al usuario a una página de error o simplemente mostrar un mensaje de error
        return;
    }

    // Obtener los datos de todos los ejercicios desde Supabase
    let { data: ejercicios, error } = await supabase
        .from('ejercicios')
        .select('*');

    if (error) {
        console.error('Error obteniendo los ejercicios:', error.message);
        return;
    }

    // Filtrar los ejercicios para encontrar el ejercicio con el ID correspondiente
    const ejercicio = ejercicios.find(e => e.id === id);

    if (!ejercicio) {
        console.error('No se encontró el ejercicio con el ID:', id);
        return;
    }

    // Función para generar el contenido del ejercicio detallado
    const generarContenidoDetalle = (ejercicio) => {
      return `
        <h1 class="mt-5">${ejercicio.titulo}</h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary mt-5" id="botonVolver">
            <i class="bi bi-arrow-bar-left" style="font-size: 1em;"></i>
            Volver
          </button>
        </div>
  
        <div class="row mt-2">
          <div class="col-12 col-md-4 mb-3">
            <img src="${ejercicio.foto}" alt="" class="img-fluid">
          </div>
          <div class="col-12 col-md-8">
            <p><strong>Nombre: </strong><span>${ejercicio.titulo}</span></p>
            <p><strong>Descripción: </strong><span>${ejercicio.descripcion}</span></p>
            <p><strong>Rutina Recomendada: </strong><span>${ejercicio.rutina}</span></p>
            <p><strong>Tipo de Ejercicio: </strong><span>${ejercicio.tipo}</span></p>
            <p><strong>Nivel de Dificultad: </strong><span>${ejercicio.nivel}</span></p>
            <p><strong>Equipamiento Necesario: </strong><span>${ejercicio.equipamiento}</span></p>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-success rounded-circle fs-3 shadow  mt-5" id="botonEditar">
          <i class="bi bi-pencil-fill"></i>
          </button>

          <button class="btn btn-sm btn-outline-danger rounded-circle fs-3 shadow  mt-5" id="botonBorrar">
          <i class="bi bi-trash3"></i>
          </button>
          
        </div>
      `;
    };

    // Inyectar el contenido del ejercicio detallado en el contenedor
    document.getElementById('ejercicioDetalleContainer').innerHTML = generarContenidoDetalle(ejercicio);

    // Botón volver atrás
    document.getElementById('botonVolver').addEventListener('click', () => {
      window.location = '#/home';
    });

     // Botón borrar ejercicio
     document.getElementById('botonBorrar').addEventListener('click', async () => {
      if (confirm('¿Estás seguro de que quieres eliminar este ejercicio?')) {
        try {
          const { error } = await supabase
            .from('ejercicios')
            .delete()
            .eq('id', id);
  
          if (error) {
            throw error;
          }
  
          alert('Ejercicio eliminado correctamente');
          console.log('Ejercicio eliminado de la base de datos');
          window.history.back(); // Redirige al usuario atrás después de eliminar el ejercicio
        } catch (error) {
          console.error('Error al eliminar ejercicio:', error.message);
          alert('Error al eliminar ejercicio. Por favor, inténtalo de nuevo.');
        }
      }
    });

    // Botón editar ejercicio
    document.getElementById('botonEditar').addEventListener('click', () => {
      // Redirige al usuario a la página de edición del ejercicio pasando el ID como parámetro
      window.location = `#/proyectoEditar/${id}`;
    });

    
  }
};
