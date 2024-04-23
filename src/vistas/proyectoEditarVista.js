import { proyectos } from '../bd/datosPrueba'

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">Edición de proyecto</h1>
  <div class="d-flex justify-content-end">
    <button id="botonVolver" class="btn btn-outline-secondary mt-5 bi bi-arrow-bar-left router-link">
      Volver</button
    >
  </div>
  <form novalidate id="formularioEditarProyecto" action="" class="form">
    <div class="row mt-2">
      <div class="col-12 col-md-4 pt-2 mb-3">
        <img id="imagenEjercicio" src="images/flexion.jpg" alt="" class="img-fluid" />
        <label class="form-label mt-2" for="urlImagen"
          ><strong>URL imagen: </strong></label
        >
        <input
          id="urlImagen"
          type="text"
          class="form-control"
          value="http://enlaceImagen.com"
        />
        <div class="invalid-feedback">
          No es una url correcta
        </div>
      </div>
      <div class="col-12 col-md-8">
        <!-- Formulario nuevo proyecto -->

        <!-- Nombre proyecto -->
        <label class="form-label" for="nombre"><strong>Nombre: </strong></label>
        <input
          required
          id="nombreEjercicio"
          type="text"
          value="Nombre Autor"
          class="form-control"
        />
        <div class="invalid-feedback">
          Debe tener un nombre de proyecto
        </div>

        <!-- Descripción -->
        <label class="form-label mt-2" for="descripcion"
          ><strong>Descripción: </strong></label
        >
        <textarea id="descripcion" class="form-control" rows="4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.</textarea
        >

        <!-- Rutina recomendada -->
        <label class="form-label mt-2" for="rutina"
          ><strong>Rutina recomendada: </strong></label
        >
        <textarea id="rutina" class="form-control" rows="4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.</textarea
      >
        <div class="invalid-feedback">
          Debes definir un estado
        </div>

        <!-- Beneficios -->
        <label class="form-label mt-2" for="beneficios"
          ><strong>Beneficios: </strong></label
        >
        <textarea id="rutina" class="form-control" rows="4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.</textarea
      >
      
        <!-- Submit -->
        <input
          id="subirProyecto"
          type="submit"
          class="btn btn-success mt-3"
          value="Actualizar proyecto"
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