export default {
  template: // html
    `
    <div class="container">
    <h1 class="mt-5">Nuevo Ejercicio</h1>
    <div class="d-flex justify-content-end">
        <button id="botonVolver" class="btn btn-outline-secondary mt-5 bi bi-arrow-bar-left">
            Volver
        </button>
    </div>

    <div class="row mt-2">
        <div class="col-12 col-md-4 pt-2 mb-3">
            <img src="images/imagenVacia.png" alt="" class="img-fluid" />
            <label class="form-label mt-2" for="urlImagen"><strong>URL imagen:</strong></label>
            <input id="urlImagen" type="text" class="form-control" value="http://enlaceImagen.com" />
        </div>
        <div class="col-12 col-md-8">
            <!-- Formulario nuevo ejercicio -->
            <form id="formularioNuevoEjercicio" action="" class="form" novalidate>
                <!-- Nombre del ejercicio -->
                <label class="form-label" for="nombreEjercicio"><strong>Nombre:</strong></label>
                <input required id="nombreEjercicio" type="text" class="form-control"
                    placeholder="Nombre del ejercicio" />

                <!-- Descripción -->
                <label class="form-label mt-2" for="descripcion"><strong>Descripción:</strong></label>
                <textarea id="descripcion" class="form-control" rows="4"
                    placeholder="Descripción del ejercicio"></textarea>

                <!-- Rutina -->
                <label class="form-label mt-2" for="rutina"><strong>Rutina:</strong></label>
                <input id="rutina" type="text" class="form-control" placeholder="Rutina recomendada" />

                <!-- Tipo de ejercicio -->
                <label class="form-label mt-2" for="tipoEjercicio"><strong>Tipo de ejercicio:</strong></label>
                <select required id="tipoEjercicio" class="form-control">
                    <option value="cardio">Cardio</option>
                    <option value="fuerza">Fuerza</option>
                    <option value="flexibilidad">Flexibilidad</option>
                    <option value="equilibrio">Equilibrio</option>
                </select>

                <!-- Nivel de dificultad -->
                <label class="form-label mt-2" for="nivelDificultad"><strong>Nivel de dificultad:</strong></label>
                <select required id="nivelDificultad" class="form-control">
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                </select>

                <!-- Equipamiento necesario -->
                <label class="form-label mt-2" for="equipamiento"><strong>Equipamiento necesario:</strong></label>
                <input id="equipamiento" type="text" class="form-control" placeholder="Equipamiento requerido" />

                <!-- Submit -->
                <input type="submit" class="btn btn-success mt-3" value="Guardar ejercicio" />
            </form>
        </div>
    </div>
</div>

    `,
    script: () => {
      // Boton volver atras
      document.querySelector('#botonVolver').addEventListener('click', () => {
          window.history.back();
      });
  
      // Validación bootstrap
      // Capturamos el formulario en una variable
      const formulario = document.querySelector('#formularioNuevoEjercicio');
  
      // Detectamos su evento submit (enviar)
      formulario.addEventListener('submit', (event) => {
          // Detenemos el evento enviar (submit)
          event.preventDefault();
          event.stopPropagation();
          // Comprobamos si el formulario no valida
          if (!formulario.checkValidity()) {
              // Y añadimos la clase 'was-validate' para que se muestren los mensajes
              formulario.classList.add('was-validated');
              // Mostramos una alerta indicando que faltan datos por completar
              alert('Por favor, completa todos los campos del formulario.');
          } else {
              enviaDatos();
          }
      });
  
      // Función para enviar datos a la base de datos
      function enviaDatos() {
          const ejercicioNuevo = {
            imagen: document.querySelector('#urlImagen').value,
            nombre: document.querySelector('#nombreEjercicio').value,
            descripcion: document.querySelector('#descripcion').value,
            rutina: document.querySelector('#rutina').value,
            tipo: document.querySelector('#tipoEjercicio').value,
            dificultad: document.querySelector('#nivelDificultad').value,
            equipamiento: document.querySelector('#equipamiento').value
          };
          // Enviar los datos del nuevo ejercicio a la base de datos o realizar la acción necesaria
          alert('Ejercicio añadido correctamente');
          console.log('Ejercicio añadido a la base de datos: ', ejercicioNuevo);
      }
  }
  
}