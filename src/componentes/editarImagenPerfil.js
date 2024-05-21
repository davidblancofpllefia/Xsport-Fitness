import adminVista from '../vistas/adminVista';
import { ls } from './funciones';

export const editarImagenPerfil = {
  template: // html
  `
  <!-- Ventana modal edición perfil -->
  <div
    class="modal fade"
    id="modalEditarImagenPerfil"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <!-- Formulario de edición de perfil -->
    <form novalidate action="">
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
                    id="imagenUsuario"
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
                    id="urlImagenUsuario"
                    type="url"
                    class="form-control"
                    value="${ls.getUsuario().avatar}"
                  />
                  <div class="invalid-feedback">La url no es correcta</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button id="botonActualizarImagen" type="button" class="btn btn-primary">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  `,
  script: () => {
    const usuario = ls.getUsuario();
    const imagenUsuario = document.querySelector('#imagenUsuario');
    const urlInput = document.querySelector('#urlImagenUsuario');

    // Inicializar el valor del input y la imagen de perfil
    urlInput.value = usuario.avatar;
    imagenUsuario.style.backgroundImage = `url(${usuario.avatar})`;

    // Actualizar la imagen de perfil en tiempo real al cambiar la URL
    urlInput.addEventListener('input', () => {
      const urlAvatar = urlInput.value;
      imagenUsuario.style.backgroundImage = `url(${urlAvatar})`;
    });

    // Manejar el click en el botón "Guardar cambios"
    document.querySelector('#botonActualizarImagen').addEventListener('click', async () => {
      const urlAvatar = urlInput.value;
      const userId = usuario.user_id;

      try {
        // Aquí se debe actualizar la base de datos con la nueva URL de la imagen
        await Perfil.updateByUserId(userId, { avatar: urlAvatar });

        // Actualizar el local storage
        ls.setUsuario({
          ...usuario,
          avatar: urlAvatar,
        });

        // Actualizar la interfaz del usuario con la nueva imagen
        document.querySelector('#imagenUsuario').style.backgroundImage = `url(${urlAvatar})`;
        document.querySelector('.imagen.mx-auto.mb-1.rounded-circle').style.backgroundImage = `url(${urlAvatar})`;

        alert('Imagen de perfil actualizada con éxito');
      } catch (error) {
        console.error('Error actualizando la imagen de perfil:', error.message);
        alert('Error actualizando la imagen de perfil. Por favor, intenta de nuevo.');
      }
    });
  }
};
