import { ls } from './funciones';
import { supabase } from '../bd/supabase';

export const editarPerfil = {
  template: //html
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

                    <!-- Email -->
                    <label for="emailPerfil" class="form-label">Email:</label>
                    <input required id="emailPerfil" type="email" class="form-control" value = "${ls.getUsuario().email}" />
                    <div class="invalid-feedback">El formato no es correcto</div>

                    <!-- Contraseña -->
                    <label for="passPerfil" class="form-label mt-3">Nueva contraseña:</label>
                    <input
                      minlength="6"
                      id="passPerfil"
                      type="password"
                      class="form-control"
                    />
                    <div class="invalid-feedback">
                      La contraseña debe ser de 6 caracteres como mínimo
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button id="enviarPerfilEditado" type="submit" class="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  script: async () => {
    console.log('Script de editar perfil cargado');
    
    // Validación Bootstrap
    const formulario = document.querySelector('#formularioEditarPerfil');
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!formulario.checkValidity()) {
        // Formulario no válido
      } else {
        // Enviamos datos a la base de datos
        await enviaDatos();
      }

      formulario.classList.add('was-validated');
    });

    // Función para enviar datos a la base de datos
    async function enviaDatos() {
      const usuario = ls.getUsuario();
      const userId = usuario.user_id; // Obtenemos el user_id del usuario
      const perfilEditado = {
        avatar: document.querySelector('#avatar').value,
        nombre: document.querySelector('#nombrePerfil').value,
        apellidos: document.querySelector('#apellidosPerfil').value,
        email: document.querySelector('#emailPerfil').value,
        password: document.querySelector('#passPerfil').value,
      };

      const { data, error } = await supabase
        .from('perfiles')
        .update(perfilEditado)
        .match({ id: userId }); // Utilizamos el userId para hacer match con el id en la tabla

      if (error) {
        console.error('Error al actualizar el perfil:', error.message);
      } else {
        console.log('Perfil actualizado correctamente:', data);
      }
    }
  }

};

