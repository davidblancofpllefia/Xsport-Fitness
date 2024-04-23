import { proyectos } from '../bd/datosPrueba'
import { supabase } from '../bd/supabase'

export default {
  template: // html
  `
  <div class="container" id="ejerciciosContainer">
  <div
      class="container fixed-bottom d-flex justify-content-end"
      style="padding: 0px 0px 100px 0px"
  >
      <button
          class="btn btn-success rounded-circle fs-3 shadow"
          style="width: 50px"
      >
          <i class="bi bi-pencil"></i>
      </button>
  </div>
  
</div>
  `,
  script: async () => {
    
    let { data: ejercicios, error } = await supabase
    .from('ejercicios')
    .select('*');

    if (error) {
    console.error('Error obteniendo los ejercicios:', error.message);
    return;
}
// Función para pintar los ejercicios en la vista

const pintarDetalleEjercicios = () => {
  const ejerciciosContainer = document.getElementById('ejerciciosContainer');
  ejerciciosContainer.innerHTML = ejercicios.map(ejercicio => `
      <h1 class="mt-5">${ejercicio.nombre}</h1>
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
              <p>
                  <strong>Nombre: </strong><span>${ejercicio.nombre}</span></p>
              <p>
                  <strong>Descripción: </strong><span>${ejercicio.descripcion}</span></p>
              <p>
                  <strong>Rutina Recomendada: </strong><span>${ejercicio.rutina}</span></p>
          </div>
      </div>
  `).join('');
};

    pintarDetalleEjercicios();
    // Modificamos el formato de la fecha quedandonos solo con el yy-mm-dd
    const fecha = proyecto.created_at
    const fechaCorta = fecha.split('T')[0]

    // Inyectamos los datos en la vista
    document.querySelector('#imagenJuego').setAttribute('src', proyecto.imagen)
    document.querySelector('#nombreJuego').innerHTML = proyecto.nombre
    document.querySelector('#descripcion').innerHTML = proyecto.descripcion
    document.querySelector('#estado').innerHTML = proyecto.estado
    document.querySelector('#fecha').innerHTML = fechaCorta
    document.querySelector('#enlace').innerHTML = proyecto.enlace
    document.querySelector('#repositorio').innerHTML = proyecto.repositorio

    // Añadimos el id en data-id al botón editar para que al detectar el click podamos llamar a la vista de edición pasandole el id en cuestión
    document.querySelector('#botonEditarDetalle').setAttribute('data-id', proyecto.id)

    // Boton volver atras
    document.querySelector('#botonVolver').addEventListener('click', () => {
      window.history.back()
    })

    // Boton editar
    document.querySelector('#botonEditarDetalle').addEventListener('click', (e) => {
      const id = e.target.dataset.id
      window.location = `#/proyectoEditar/${id}`
    })
  }
}