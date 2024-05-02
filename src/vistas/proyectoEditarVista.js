import { proyectos } from '../bd/datosPrueba'

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">Editar Ejercicio</h1>
  <div class="d-flex justify-content-end">
    <button id="botonVolver" class="btn btn-outline-secondary mt-5 bi bi-arrow-bar-left router-link">
      Volver
    </button>
  </div>
  <form novalidate id="formularioEditarEjercicio" action="" class="form">
    <div class="row mt-2">
      <div class="col-12 col-md-4 pt-2 mb-3">
        <img id="imagenEjercicio" src="images/imagenVacia.png" alt="" class="img-fluid" />
        <label class="form-label mt-2" for="urlImagen"><strong>URL imagen: </strong></label>
        <input
          id="urlImagen"
          type="text"
          class="form-control"
          value="http://enlaceImagen.com"
        />
        <div class="invalid-feedback">
          No es una URL correcta
        </div>
      </div>
      <div class="col-12 col-md-8">
        <!-- Formulario de edición de ejercicio -->

        <!-- Nombre del ejercicio -->
        <label class="form-label" for="nombreEjercicio"><strong>Nombre: </strong></label>
        <input
          required
          id="nombreEjercicio"
          type="text"
          value="Nombre del Ejercicio"
          class="form-control"
        />
        <div class="invalid-feedback">
          Debes ingresar un nombre para el ejercicio
        </div>

        <!-- Descripción -->
        <label class="form-label mt-2" for="descripcion"><strong>Descripción: </strong></label>
        <textarea id="descripcion" class="form-control" rows="4" placeholder="Descripción del ejercicio"></textarea>

        <!-- Rutina -->
        <label class="form-label mt-2" for="rutina"><strong>Rutina: </strong></label>
        <input id="rutina" type="text" class="form-control" placeholder="Rutina recomendada" />

        <!-- Tipo de ejercicio -->
        <label class="form-label mt-2" for="tipoEjercicio"><strong>Tipo de ejercicio: </strong></label>
        <select required id="tipoEjercicio" class="form-control">
          <option value="cardio">Cardio</option>
          <option value="fuerza">Fuerza</option>
          <option value="flexibilidad">Flexibilidad</option>
          <option value="equilibrio">Equilibrio</option>
        </select>

        <!-- Nivel de dificultad -->
        <label class="form-label mt-2" for="nivelDificultad"><strong>Nivel de dificultad: </strong></label>
        <select required id="nivelDificultad" class="form-control">
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        <!-- Equipamiento necesario -->
        <label class="form-label mt-2" for="equipamiento"><strong>Equipamiento necesario: </strong></label>
        <input id="equipamiento" type="text" class="form-control" placeholder="Equipamiento requerido" />

        <!-- Botón de submit -->
        <input
          id="actualizarEjercicio"
          type="submit"
          class="btn btn-success mt-3"
          value="Actualizar ejercicio"
        />
      </div>
    </div>
  </form>
</div>


  `,
  script: (id) => {
    // Simulamos la consulta a un proyecto por id
    // eslint-disable-next-line eqeqeq
    const proyectoArray = proyectos.filter(p => p.id == id)
    const proyecto = proyectoArray[0]

    // Transformamos la fecha en un formato yy-mm-dd
    const fecha = proyecto.created_at
    const fechaCorta = fecha.split('T')[0]

    // Insertamos los datos en el formulario
    document.querySelector('#imagenEjercicio').setAttribute('src', ejercicio.imagen)
    document.querySelector('#urlImagen').value = ejercicio.imagen
    document.querySelector('#nombreEjercicio').value = ejercicio.nombre
    document.querySelector('#descripcion').value = ejercicio.descripcion
    document.querySelector('#estado').value = ejercicio.estado
   
    // Actualización de la imagen a partir de la urlImagen
    // Capturamos input
    const inputUrl = document.querySelector('#urlImagen')
    // Detectamos cambios en su value
    inputUrl.addEventListener('input', () => {
      const imagen = document.querySelector('#imagenJuego')
      // Actualizamos el atributo src y por lo tanto la imagen
      imagen.setAttribute('src', inputUrl.value)
    })

    // Validación BOOTSTRAP
    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formularioEditarProyecto')
    // Detectamos su evento submit (enviar)
    formulario.addEventListener('submit', (event) => {
      // Detenemos el evento enviar (submit)
      event.preventDefault()
      event.stopPropagation()
      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
        // Y añadimos la clase 'was-validate' para que se muestren los mensajes
        formulario.classList.add('was-validated')
      } else {
        //* ** ENVIAMOS DATOS A LA BASE DE DATOS */
        enviaDatos()
      }
    })
    // Boton volver atras
    document.querySelector('#botonVolver').addEventListener('click', () => {
      window.location = `#/proyectoDetalle/`
    })

    // Función para enviar datos a la base de datos
    function enviaDatos () {
      const proyectoEditado = {
        imagen: document.querySelector('#urlImagen').value,
        nombre: document.querySelector('#nombreJuego').value,
        descripcion: document.querySelector('#descripcion').value,
        estado: document.querySelector('#estado').value,
        enlace: document.querySelector('#enlace').value,
        repositorio: document.querySelector('#repositorio').value
      }
      // eslint-disable-next-line no-undef
      alert(`Enviando a la base de datos el objeto con id = ${proyecto.id}`)
      console.log(`Enviando a la base de datos el objeto con id = ${proyecto.id}`, proyectoEditado)
    }
  }
}