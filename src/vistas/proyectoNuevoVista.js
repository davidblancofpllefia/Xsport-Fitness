
import { supabase } from '../bd/supabase'; // Importa tu instancia de Supabase


export default {
  template: //html
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
          <label class="form-label mt-2" for="urlGif"><strong>URL GIF:</strong></label>
          <input id="urlGif" type="text" class="form-control" value="http://enlaceImagen.com" />
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
  script: () => { //HICE EL BOTON VOLVER EN MAIN DIRECTAMENTE SI NO VA HACERLO AQUI Y LUEGO EL MERGE IRA
    // Captura el formulario
    const formulario = document.querySelector('#formularioNuevoEjercicio');

    // Detecta el evento submit del formulario
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
        alert('Por favor, completa todos los campos del formulario.');
      } else {
        enviaDatos();
      }
    });

    // Función para enviar los datos a la base de datos utilizando Supabase
    async function enviaDatos() {
      const ejercicioNuevo = {
        foto: document.querySelector('#urlImagen').value,
        gif: document.querySelector('#urlGif').value,
        titulo: document.querySelector('#nombreEjercicio').value,
        descripcion: document.querySelector('#descripcion').value,
        rutina: document.querySelector('#rutina').value,
        tipo: document.querySelector('#tipoEjercicio').value,
        nivel: document.querySelector('#nivelDificultad').value,
        equipamiento: document.querySelector('#equipamiento').value
      };

      try {
        // Inserta el ejercicio en la base de datos utilizando Supabase
        const { data, error } = await supabase
          .from('ejercicios')
          .insert([ejercicioNuevo]);

        if (error) {
          throw error;
        }

        alert('Ejercicio añadido correctamente');
        console.log('Ejercicio añadido a la base de datos:', data);
        window.location = '#/home';
      } catch (error) {
        console.error('Error al añadir ejercicio a la base de datos:', error.message);
        alert('Error al añadir ejercicio a la base de datos. Por favor, inténtalo de nuevo.');
      }
    }
  }
}

