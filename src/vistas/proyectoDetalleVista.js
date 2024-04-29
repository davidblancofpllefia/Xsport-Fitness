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
      `;
    };

    // Inyectar el contenido del ejercicio detallado en el contenedor
    document.getElementById('ejercicioDetalleContainer').innerHTML = generarContenidoDetalle(ejercicio);

    // Botón volver atrás
    document.getElementById('botonVolver').addEventListener('click', () => {
      window.history.back();
    });
  }
};
