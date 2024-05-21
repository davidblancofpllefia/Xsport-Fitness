import { ls } from './funciones';
import { Perfil } from '../bd/perfil';

export const editarPerfil = {
  template: // html
  `
  <!-- Ventana modal edición perfil -->
  <div
    class="modal fade"
    id="modalEditarPerfil"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <!-- Formulario de edición de perfil -->
    <form novalidate id="formularioEditarPerfil" action="">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Edición de perfil
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form border shadow-sm p-3">
              <div class="m-1" style="max-width: 400px">
                <div class="imgPerfil border shadow-sm p-3 mb-3">
                  <div
                    class="imagen mx-auto mb-1 rounded-circle"
                    style="
                      background-image: url(${ls.getUsuario().avatar});
                      width: 200px;
                      height: 200px;
                      background-size: cover;
                      background-position: center;
                    "
                  ></div>

                  <!-- Imagen de perfil -->
                  <label for="imagen" class="form-label mt-3">URL imagen:</label>
                  <input
                    id="avatar"
                    type="url"
                    class="form-control"
                    value="${ls.getUsuario().avatar}"
                  />
                  <div class="invalid-feedback">La url no es correcta</div>
                </div>

                <div class="">
                  <!-- Nombre -->
                  <label for="nombrePerfil" class="form-label">Nombre:</label>
                  <input required id="nombrePerfil" type="text" class="form-control" value="${ls.getUsuario().nombre}" />
                  <div class="invalid-feedback">El nombre es requerido</div>
                  <!-- Apellidos -->
                  <label for="apellidosPerfil" class="form-label">Apellidos:</label>
                  <input id="apellidosPerfil" type="text" class="form-control" value = "${ls.getUsuario().apellidos}" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button id="enviarPerfilEditado" data-id="${ls.getUsuario().user_id}" type="submit" class="btn btn-primary">Guardar cambios</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  `,
  script: () => {
    console.log('script editar perfil cargado');

    // Función para actualizar el formulario con los datos del perfil del usuario
    function actualizarFormularioPerfil(perfilUsuario) {
      document.getElementById('nombrePerfil').value = perfilUsuario.nombre;
      document.getElementById('apellidosPerfil').value = perfilUsuario.apellidos;
      document.getElementById('avatar').value = perfilUsuario.avatar;
    }

    // Verificar si hay un usuario logueado y actualizar el formulario con sus datos
    const usuario = ls.getUsuario();
    if (usuario.user_id) {
      Perfil.getByUserId(usuario.user_id)
        .then(perfil => {
          actualizarFormularioPerfil(perfil);
        })
        .catch(error => {
          console.error('Error obteniendo el perfil del usuario:', error.message);
        });
    }

    const formulario = document.querySelector('#formularioEditarPerfil');
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
      } else {
        enviaDatos();
      }
    });

    async function enviaDatos() {
      const perfilEditado = {
        avatar: document.querySelector('#avatar').value,
        nombre: document.querySelector('#nombrePerfil').value,
        apellidos: document.querySelector('#apellidosPerfil').value,
      };

      try {
        const userId = ls.getUsuario().user_id;
        if (!userId) {
          throw new Error("El ID del usuario no está definido.");
        }

        const perfilActualizado = await Perfil.updateByUserId(userId, perfilEditado);

        // Actualizamos localStorage con los nuevos datos del perfil
        ls.setUsuario({
          ...ls.getUsuario(),
          ...perfilEditado,
        });

        // Actualizar la interfaz del usuario con los nuevos datos
        document.querySelector('.imagen.mx-auto.mb-1.rounded-circle').style.backgroundImage = `url(${perfilEditado.avatar})`;

        alert('Perfil actualizado con éxito');
      } catch (error) {
        console.error('Error actualizando el perfil:', error.message);
        alert('Error actualizando el perfil. Por favor, intenta de nuevo.');
      }
    }
  }
};
