import { proyectos } from '../bd/datosPrueba'

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">Ejercicio 1</h1>
  <div class="d-flex justify-content-end">
      <bottom class="btn btn-outline-secondary mt-5">
          <i class="bi bi-arrow-bar-left" style="font-size: 1em;"></i>
          Volver</bottom>
  </div>
  
  <div class="row mt-2">
      <div class="col-12 col-md-4 mb-3">
          <img src="images/flexion.jpg" alt="" class="img-fluid">
      </div>
      <div class="col-12 col-md-8">
          <p>
              <p><strong>Nombre: </strong><span id="nombre">FLEXIÓN</span></p>
              <p><strong>Descripción: </strong><span id="nombre">Las flexiones, también conocidas como lagartijas o push-ups, son un ejercicio de fuerza fundamental que trabaja diversos grupos musculares. Este ejercicio se realiza en posición horizontal, apoyando las manos y los pies en el suelo. La técnica básica consiste en bajar y subir el cuerpo mediante la flexión y extensión de los brazos, fortaleciendo principalmente los músculos del pecho, hombros, tríceps y abdomen.</span></p>
              <p><strong>Rutina Recomendada: </strong><span id="nombre">Incorpora flexiones en tu rutina de entrenamiento 2-3 veces por semana. Comienza con un número moderado de repeticiones e incrementa progresivamente a medida que ganas fuerza.

                  Recuerda consultar a un profesional de la salud o un entrenador personal antes de iniciar cualquier nuevo programa de ejercicios, especialmente si tienes alguna condición médica preexistente.</span></p>
          </p>
          <p><strong>Beneficios:</strong><span id="nombre"></span></p>
          <ul class="list-unstyled">
              <li>Desarrollo de la fuerza en la parte superior del cuerpo.</li>
              <li>Mejora de la resistencia muscular.</li>
              <li>Fortalecimiento de los músculos del core.</li>
              <li>Estimulación del sistema cardiovascular.</li>
              <li>Ejercicio versátil, adaptable a diferentes niveles de condición física.</li>
          </ul>
      </div>
  </div>
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
  script: (id) => {
    console.log('Vista proyectoDetalle cargada')
    console.log(proyectos, id)

    // Simulamos la consulta a un proyecto por id filtrando de todos nuestros proyectos de prueba el que tiene el id que hemos recibido como parámetro
    const proyectoArray = proyectos.filter(p => p.id === id)
    const proyecto = proyectoArray[0]

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