import { supabase } from '../bd/supabase';
import { ls } from '../componentes/funciones'


export default {
  template: //html
  `
    <div class="container">
      <h1 class="mt-5">Editar Ejercicio</h1>
      <div class="d-flex justify-content-end">
          <button id="botonVolver" class="btn btn-outline-secondary mt-5 bi bi-arrow-bar-left">
              Volver
          </button>
      </div>

      <div class="row mt-2">
          <div class="col-12 col-md-4 pt-2 mb-3">
              <img id="imagenEjercicio" alt="" class="img-fluid" />
              <label class="form-label mt-5" for="urlImagen"><strong>URL imagen:</strong></label>
              <input id="urlImagen" type="text" class="form-control" />
              <label class="form-label mt-5" for="urlGif"><strong>URL GIF:</strong></label>
              <input id="urlGif" type="text" class="form-control" />
          </div>
          <div class="col-12 col-md-8">
              <!-- Formulario nuevo ejercicio -->
              <form id="formularioEditarEjercicio" action="" class="form" novalidate>
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
  script: (id) => {
      // Obtiene la información del usuario
      const usuario = ls.getUsuario();

      // Verifica si el usuario no está autenticado o es un usuario registrado
      if (!usuario || usuario.rol === 'registrado') {
       // Redirige a la página de registro
       window.location = '#/home';
       return;
     }
    // Consultar el ejercicio por su ID
    supabase
      .from('ejercicios')
      .select('*')
      .eq('id', id)
      .then(({ data: [proyecto], error }) => {
        if (error) {
          console.error('Error al obtener el ejercicio:', error.message);
          return;
        }

        // Llenar los campos del formulario con los detalles del ejercicio
        document.querySelector('#imagenEjercicio').src = proyecto.foto || 'images/imagenVacia.png';
        document.querySelector('#urlImagen').value = proyecto.foto || '';
        document.querySelector('#urlGif').value = proyecto.gif || '';
        document.querySelector('#nombreEjercicio').value = proyecto.titulo || '';
        document.querySelector('#descripcion').value = proyecto.descripcion || '';
        document.querySelector('#rutina').value = proyecto.rutina || '';
        document.querySelector('#tipoEjercicio').value = proyecto.tipo || '';
        document.querySelector('#nivelDificultad').value = proyecto.nivel || '';
        document.querySelector('#equipamiento').value = proyecto.equipamiento || '';
      })
      .catch((error) => {
        console.error('Error al obtener el ejercicio:', error.message);
      });

    // Validación BOOTSTRAP
    const formulario = document.querySelector('#formularioEditarEjercicio');
    formulario.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
      } else {
        enviaDatos();
      }
    });

    // Botón volver atrás
    document.querySelector('#botonVolver').addEventListener('click', () => {
      window.location = `#/proyectoDetalle/${id}`;
    });

    function enviaDatos() {
      const proyectoEditado = {
        foto: document.querySelector('#urlImagen').value,
        gif: document.querySelector('#urlGif').value,
        titulo: document.querySelector('#nombreEjercicio').value,
        descripcion: document.querySelector('#descripcion').value,
        rutina: document.querySelector('#rutina').value,
        tipo: document.querySelector('#tipoEjercicio').value,
        nivel: document.querySelector('#nivelDificultad').value,
        equipamiento: document.querySelector('#equipamiento').value
      };
      supabase
        .from('ejercicios')
        .update(proyectoEditado)
        .eq('id', id)
        .then((response) => {
          if (response.error) {
            console.error('Error al actualizar el ejercicio:', response.error.message);
            alert('Error al actualizar el ejercicio. Por favor, inténtalo de nuevo.');
          } else {
            alert('Ejercicio actualizado correctamente');
            console.log('Ejercicio actualizado en la base de datos:', response.data);
            window.location = `#/proyectoDetalle/${id}`;
          }
        })
        .catch((error) => {
          console.error('Error al actualizar el ejercicio:', error.message);
          alert('Error al actualizar el ejercicio. Por favor, inténtalo de nuevo.');
        });
    }
  },
};
