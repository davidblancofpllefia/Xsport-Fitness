import { supabase } from '../bd/supabase';
import { ls } from '../componentes/funciones';
import { editarImagenPerfil } from '../componentes/editarImagenPerfil';

export default {
  template: // html
  `
  <div class="container">
    <h1 class="mt-5">Panel de administración</h1>
    <div class="row mt-5">
      <div class="col-12">
        <!--nav-tabs-->
        <ul class="nav nav-tabs">
          <!--Etiqueta Proyectos-->
          <li class="nav-item w-50">
            <button 
              class="selectorFicha fichaProyectos nav-link w-100"
              id="btnProyectos"
            >
              Proyectos
            </button>
          </li>
          <!--Etiqueta Usuarios-->
          <li id="pestanyaUsuarios" class="nav-item w-50">
            <button 
              class="selectorFicha fichaUsuarios nav-link w-100 active"
              id="btnUsuarios"
            >
              Usuarios
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="border border-top-0 p-3">
      <div class="row">
        <div class="d-flex col-12 col-sm-8 mb-3">
          <!-- Buscador -->
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping"><i class="bi bi-search"></i></span>
            <input
              id="inputBusqueda"
              type="text"
              class="form-control"
              placeholder="Buscador"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
            <span class="input-group-text" id="addon-wrapping"><i id="borrarBuscador" class="bi bi-x"></i></span>
          </div>
        </div>
      </div>
      <div id="tabUsuarios" class="col-12" style="overflow-x: auto"></div>
      <div id="tabProyectos" class="col-12 d-none" style="overflow-x: auto"></div>
    </div>
  </div>
  ${editarImagenPerfil.template} 
  `,
  script: async () => {
    // Capturamos los datos del usuario logueado
    const usuario = ls.getUsuario();
  
    // Función para obtener y pintar la tabla de usuarios
    async function obtenerUsuarios() {
      try {
        const { data: usuarios, error } = await supabase.from('perfiles').select('*');
        if (error) throw error;
        pintaUsuarios(usuarios);
      } catch (error) {
        console.error('Error al obtener usuarios desde la base de datos:', error.message);
      }
    }
    // *** Detectamos si se cambia de proyectos a usuarios al hacer click en las pestañas ***
    document.querySelector('.fichaProyectos').addEventListener('click', (event) => {
      // Redirigir a la página de proyectos
      window.location = '#/proyectos';
    })
    document.querySelector('.fichaUsuarios').addEventListener('click', (event) => {
      // Redirigir a la página de proyectos
      window.location = '#/admin';
    })
    
    // Función para pintar la tabla de usuarios
    const pintaUsuarios = (usuarios) => {
      let tablaUsuarios = `
        <table class="table table-hover align-middle mt-3" style="min-width: 1200px">
          <thead>
            <tr>
              <th></th>
              <th>URL imagen</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
      `;
      usuarios.forEach(usuario => {
        tablaUsuarios += `
          <tr>
            <td>
              <div class="containerImagen">
                <div class="rounded-circle d-flex align-items-end justify-content-end" style="
                    background-image: url(${usuario.avatar || 'images/imagenVacia.png'});
                    width: 50px;
                    height: 50px;
                    background-size: cover;
                    background-position: center;
                  ">
                  <i
                    data-id="${usuario.user_id}"
                    data-urlavatar="${usuario.avatar}"
                    data-urlinputavatar="urlImagen_${usuario.user_id}"
                    class="btn btn-success btn-sm rounded-circle bi bi-pencil botonEditarImagen"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditarImagenPerfil"
                  ></i>
                </div>
              </div>
            </td>
            <td>
              <input id="urlImagen_${usuario.user_id}" type="url" class="form-control form-control-sm" value="${usuario.avatar || ''}" />
              <div class="invalid-feedback">La URL no es válida</div>
            </td>
            <td>
              <input required id="email_${usuario.user_id}" type="email" class="form-control form-control-sm" value="${usuario.email || ''}" />
              <div class="invalid-feedback">Formato incorrecto</div>
            </td>
            <td>
              <input required id="nombreUsuario_${usuario.user_id}" type="text" class="form-control form-control-sm" value="${usuario.nombre || ''}" />
              <div class="invalid-feedback">Nombre requerido</div>
            </td>
            <td>
              <input id="apellidosUsuario_${usuario.user_id}" type="text" class="form-control form-control-sm" value="${usuario.apellidos || ''}" />
            </td>
            <td>
              <select class="form-control form-control-sm" id="rol_${usuario.user_id}">
                <option value="${usuario.rol || ''}">${usuario.rol || ''}</option>
                <option value="registrado">Registrado</option>
                <option value="entrenador">Entrenador</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button data-id="${usuario.user_id}" class="btn btn-sm btn-outline-danger bi bi-trash3 botonEliminar"></button>
              <button data-id="${usuario.user_id}" type="submit" class="btn btn-sm btn-success botonActualizar">Actualizar</button>
            </td>
          </tr>
        `;
      });
      tablaUsuarios += `</tbody></table>`;
      document.getElementById('tabUsuarios').innerHTML = tablaUsuarios;
    };
    
    // Función para actualizar un usuario en la base de datos
    async function actualizarUsuario(id) {
      const avatar = document.querySelector(`#urlImagen_${id}`).value;
      const email = document.querySelector(`#email_${id}`).value;
      const nombre = document.querySelector(`#nombreUsuario_${id}`).value;
      const apellidos = document.querySelector(`#apellidosUsuario_${id}`).value;
      const rol = document.querySelector(`#rol_${id}`).value;
      
      if (!validarDatos(email, nombre)) return;
      
      try {
        const { data, error } = await supabase
          .from('perfiles')
          .update({ avatar, email, nombre, apellidos, rol })
          .eq('user_id', id);
        if (error) throw error;
        mostrarMensaje('Usuario actualizado correctamente.');
        obtenerUsuarios();
      } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        mostrarMensaje('Error al actualizar usuario. Por favor, inténtalo de nuevo.', 'danger');
      }
    }
    
    // Validación de datos antes de enviar
    function validarDatos(email, nombre) {
      if (!email || !nombre) {
        mostrarMensaje('Email y nombre son requeridos.', 'danger');
        return false;
      }
      return true;
    }
    
    // Función para mostrar mensajes al usuario
    function mostrarMensaje(mensaje, tipo = 'success') {
      const mensajeDiv = document.createElement('div');
      mensajeDiv.className = `alert alert-${tipo} mt-3`;
      mensajeDiv.textContent = mensaje;
      document.querySelector('.container').prepend(mensajeDiv);
      setTimeout(() => mensajeDiv.remove(), 3000);
    }
    
    // Eventos para actualizar usuarios
    document.addEventListener('click', (e) => {
      if (e.target.matches('.botonActualizar')) {
        const id = e.target.getAttribute('data-id');
        actualizarUsuario(id);
      }
    });
    
    // Eventos para eliminar usuarios
    document.addEventListener('click', async (e) => {
      if (e.target.matches('.botonEliminar')) {
        const id = e.target.getAttribute('data-id');
        try {
          const { error } = await supabase.from('perfiles').delete().eq('user_id', id);
          if (error) throw error;
          mostrarMensaje('Usuario eliminado correctamente.');
          obtenerUsuarios();
        } catch (error) {
          console.error('Error al eliminar usuario:', error.message);
          mostrarMensaje('Error al eliminar usuario. Por favor, inténtalo de nuevo.', 'danger');
        }
      }
    });
    
    // Inicialización
    obtenerUsuarios();
  },
};