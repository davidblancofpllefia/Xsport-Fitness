import { proyectos, perfiles } from '../bd/datosPrueba'
import { ls } from '../componentes/funciones'
import { editarImagenPerfil } from '../componentes/editarImagenPerfil'
import { supabase } from '../bd/supabase'

export default {
  template: //html
  `
  <div class="container">
    <h1 class="mt-5">Panel de administración</h1>
    <div class="row mt-5">
      <div class="col-12">
        <!--nav-tabs-->
        <ul class="nav nav-tabs">
          <!--Etiqueta Todos los proyectos-->
          <li class="nav-item w-50">
            <button class="selectorFicha fichaProyectos nav-link w-100">
              Proyectos
            </button>
          </li>
          <!--Etiqueta Mis proyectos-->
          <li id="pestanyaUsuarios" class="nav-item w-50">
            <button class="selectorFicha fichaUsuarios nav-link w-100 active">
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
            <span class="input-group-text" id="addon-wrapping">
              <i class="bi bi-search"></i>
            </span>
            <input
              id="inputBusqueda"
              type="text"
              class="form-control"
              placeholder="Buscador"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
            <span class="input-group-text" id="addon-wrapping">
              <i id="borrarBuscador" class="bi bi-x"></i>
            </span>
          </div>
        </div>
      </div>
      <div id="tabUsuarios" class="col-12" style="overflow-x: auto">
        <!-- Aquí se llenará la tabla de usuarios -->
      </div>
      <div id="tabProyectos" class="col-12 d-none" style="overflow-x: auto">
        <!-- Aquí se llenará la tabla de proyectos -->
      </div>
    </div>
  </div>
  ${editarImagenPerfil.template}
  `,
  script: async () => {
    // Capturamos los datos del usuario logueado
    const usuario = ls.getUsuario();
  
// Función para borrar un usuario de la base de datos
async function borrarUsuario(id) {
  try {
    const { data, error } = await supabase
      .from('perfiles')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    if (data) {
      alert('Usuario eliminado correctamente');
      console.log('Usuario eliminado de la base de datos', data);
      // Actualizar la lista de usuarios después de eliminar uno
      obtenerUsuarios();
    } else {
      alert('No se pudo eliminar el usuario');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    alert('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
  }
}

// Evento para manejar el click en el botón eliminar
document.querySelector('main').addEventListener('click', (event) => {
  if (event.target.classList.contains('botonEliminar')) {
    const id = event.target.dataset.id;
    borrarUsuario(id);
  }
});


// Evento para manejar el click en el botón eliminar
document.querySelector('main').addEventListener('click', (event) => {
  if (event.target.classList.contains('botonEliminar')) {
    const id = event.target.dataset.id;
    borrarUsuario(id);
  }
});



// Función para obtener y pintar la tabla de usuarios
async function obtenerUsuarios() {
  try {
    const { data: usuarios, error } = await supabase.from('perfiles').select('*');

    if (error) {
      throw error;
    }

    // Pintar la tabla de usuarios con los datos obtenidos
    pintaUsuarios(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios desde la base de datos:', error.message);
  }
}

// *** FUNCIÓN PARA PINTAR LA TABLA DE USUARIOS ***
const pintaUsuarios = (usuariosFiltrados) => {
  let tablaUsuarios = `
    <!-- Tabla de usuarios -->
    <table class="table table-hover align-middle mt-3" style="min-width: 1200px">
      <thead>
        <tr>
          <th></th>
          <th>URL imagen</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  usuariosFiltrados.forEach(usuario => {
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
          <!-- URL imagen -->
          <input
            id="urlImagen_${usuario.user_id}"
            type="url"
            class="form-control form-control-sm"
            value="${usuario.avatar || ''}"
          />
          <div class="invalid-feedback">
            La URL no es válida
          </div>
        </td>
        <td>
          <!-- Email -->
          <input
            required
            id="email_${usuario.user_id}"
            type="email"
            class="form-control form-control-sm"
            value="${usuario.email || ''}"
          />
          <div class="invalid-feedback">
            Formato incorrecto
          </div>
        </td>
        <td>
          <!-- Nombre -->
          <input
            required
            id="nombreUsuario_${usuario.user_id}"
            type="text"
            class="form-control form-control-sm"
            value="${usuario.nombre || ''}"
          />
          <div class="invalid-feedback">
            Nombre requerido
          </div>
        </td>
        <td>
          <!-- Apellidos -->
          <input
            id="apellidosUsuario_${usuario.user_id}"
            type="text"
            class="form-control form-control-sm"
            value="${usuario.apellidos || ''}"
          />
        </td>
        <td>
          <!-- Rol -->
          <select class="form-control form-control-sm" name="" id="rol_${usuario.user_id}">
            <option value="${usuario.rol || ''}">${usuario.rol || ''}</option>
            <option value="registrado">Registrado</option>
            <option value="desarrollador">Desarrollador</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td>
          <!-- Estado -->
          <select class="form-control form-control-sm" name="" id="estado_${usuario.user_id}">
            <option value="${usuario.estado || ''}">${usuario.estado || ''}</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </td>
        <td>
          <button data-id="${usuario.user_id}" class="btn btn-sm btn-outline-danger bi bi-trash3 botonEliminar"></button>
          <button data-id="${usuario.user_id}" type="submit" class="btn btn-sm btn-success botonActualizar">Actualizar</button>
        </td>
      </tr>
    `;
  });

  tablaUsuarios += '</tbody></table>';

  document.querySelector('#tabUsuarios').innerHTML = tablaUsuarios;
};

// Llamamos a la función para obtener y pintar la tabla de usuarios al cargar la página
obtenerUsuarios();



    // *** Pintamos los datos en tabla y tarjetas ***
    pintaProyectos(datosProyectos)
    pintaUsuarios(datosUsuarios)
  
    // *** FILTRO PARA BUSCADOR ***
    // Capturamos el input de búsqueda
    const inputBusqueda = document.getElementById('inputBusqueda')
    // Agregamos un evento de escucha para el evento de entrada en el input de búsqueda
    inputBusqueda.addEventListener('input', () => {
      // Capturamos el texto de búsqueda del input, conviértelo a minúsculas y elimina espacios en blanco al principio y al final
      const textoBusqueda = inputBusqueda.value.toLowerCase().trim()
      // Filtramos los proyectos que coinciden con el texto de búsqueda en cualquier campo
      let informacion = []
      if (selectUsuarios) {
        informacion = datosUsuarios
      } else {
        informacion = datosProyectos
      }
      const informacionFiltrada = informacion.filter(proyecto => {
        // Itera sobre las propiedades (campos) de cada proyecto
        for (const key in proyecto) {
          // Obtenemos el valor del campo actual
          const valorCampo = proyecto[key]
          // Verificamos si el valor del campo es una cadena y si contiene el texto de búsqueda
          if (typeof valorCampo === 'string' && valorCampo.toLowerCase().includes(textoBusqueda)) {
            // Si hay coincidencia, devuelve true para incluir el proyecto en la lista filtrada
            return true
          }
        }
        // Si no se encontró coincidencia en ningún campo, devuelve false para excluir el proyecto
        return false
      })
      // Volvemos a pintar los datos con los proyectos o usuarios filtrados por el buscador
      if (selectUsuarios) {
        pintaUsuarios(informacionFiltrada)
      } else {
        pintaProyectos(informacionFiltrada)
      }
    })
    // Borrar datos del input del buscador
    document.querySelector('#borrarBuscador').addEventListener('click', () => {
      // Borramos contenido del buscador
      document.getElementById('inputBusqueda').value = ''
      // Actualizamos array con todos los proyectos
      // const proyectosFiltrados = datos
      // Actualizamos los datos en el panel central
      pintaProyectos(datosProyectos)
      pintaUsuarios(datosUsuarios)
    })
    // ******************* PARA el TAB de PROYECTOS **********
    // *** BOTONES DE EDICIÓN Y BORRADO DE PROYECTOS ***
    // Detectamos clic sobre main (Usamos delegación de eventos porque la tabla y tarjetas se actualizan constantemente en el DOM)
    document.querySelector('main').addEventListener('click', (event) => {
      // Si hemos pulsado sobre uno de los botones
      if (event.target.classList.contains('botonAdmin')) {
        const boton = event.target
        // Capturamos el id de su dataset
        const id = boton.dataset.id
        if (boton.classList.contains('botonEditar')) {
          // Si se trata de editar
          console.log('Editar proyecto ' + id)
  
          // Cargamos la vista para editar proyecto pasandole como parámetro el id
          window.location = `#/proyectoEditar/${id}`
        }
        if (boton.classList.contains('botonBorrar')) {
          // Si se trata de borrar
          console.log('Borrar proyecto ' + id)
  
          // *** AQUÍ VA LA FUNCIÓN QUE BORRA DE LA BASE DE DATOS EL PROYECTO CORRESPONDIENTE AL ID ***
        }
      }
    })
  
    // *************** PARA EL TAB DE USUARIOS ********

  
    // Función para actualizar los datos de un usuario en la base de datos
    async function enviaDatos(id) {
      // capturamos los datos del tr correspondiente al botón pulsado
      const usuarioEditado = {
        avatar: document.querySelector('#urlImagen_' + id).value,
        nombre: document.querySelector('#nombreUsuario_' + id).value,
        apellidos: document.querySelector('#apellidosUsuario_' + id).value,
        email: document.querySelector('#email_' + id).value,
        rol: document.querySelector('#rol_' + id).value,
        estado: document.querySelector('#estado_' + id).value
      };
  
      try {
        const { data, error } = await supabase
          .from('perfiles')
          .update(usuarioEditado)
          .eq('user_id', user_id);
  
        if (error) {
          throw error;
        }
  
        alert('Usuario actualizado correctamente');
        console.log('Usuario actualizado en la base de datos', data);
        // Actualizar la lista de usuarios después de actualizar uno
        actualizarListaUsuarios();
      } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        alert('Error al actualizar usuario. Por favor, inténtalo de nuevo.');
      }
    }
  
    // Función para obtener y actualizar la lista de usuarios desde la base de datos
    async function actualizarListaUsuarios() {
      try {
        const { data: usuarios, error } = await supabase
          .from('perfiles')
          .select('*');
  
        if (error) {
          throw error;
        }
  
        // Vuelve a pintar la lista de usuarios con los datos actualizados
        pintaUsuarios(usuarios);
      } catch (error) {
        console.error('Error al actualizar la lista de usuarios:', error.message);
      }
    }
  
    // Capturamos el formulario para edición de usuarios
    const formulario = document.querySelector('#formAdminUsuarios');
  
    // Gestión de click sobre botones dentro del formulario
    formulario.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      // Si hacemos click sobre el botonActualizar
      if (e.target.classList.contains('botonActualizar') && formulario.checkValidity()) {
        const id = e.target.dataset.id;
        enviaDatos(id);
      } else {
        formulario.classList.add('was-validated');
      }
  
      // Si hacemos click sobre Borrar registro
      if (e.target.classList.contains('botonEliminar')) {
        const tr = e.target.parentNode.parentNode;
        // ocultar tr
        tr.classList.add('d-none');
        const id = e.target.dataset.id;
        borrarUsuario(id);
      }
  
      // Si hacemos click sobre Editar imagen avatar
      if (e.target.classList.contains('botonEditarImagen')) {
        // Capturamos datos para enviar al modal
        const urlAvatar = e.target.dataset.urlavatar;
        const urlInputAvatar = e.target.dataset.urlinputavatar;
        const id = e.target.dataset.id;
        // Abrimos ventana de edición de perfil (del componente editarImagenPerfil)
        editarImagenPerfil.script(urlAvatar, urlInputAvatar, id);
      }
    });
  
    // *** VALIDACION DE FORMULARIOS CON BOOTSTRAP ***
    formulario.addEventListener('change', (e) => {
      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
        console.log('No valida');
        // Y añadimos la clase 'was-validate' para que se muestren los mensajes
        formulario.classList.add('was-validated');
      }
    });
    // Función para borrar un usuario de la base de datos
async function borrarUsuario(id) {
  try {
    const { data, error } = await supabase
      .from('perfiles')
      .delete()
      .eq('user_id', id); 

    if (error) {
      throw error;
    }

    if (data) {
      alert('Usuario eliminado correctamente');
      console.log('Usuario eliminado de la base de datos', data);
      obtenerUsuarios();
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    alert('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
  }
}

// Evento para manejar el click en el botón eliminar
document.querySelector('main').addEventListener('click', (event) => {
  if (event.target.classList.contains('botonEliminar')) {
    const id = event.target.dataset.id;
    if (id) {
      borrarUsuario(id);
    } else {
      console.error('Error: el ID del usuario es nulo o indefinido');
      alert('Error al eliminar usuario. ID de usuario no válido.');
    }
  }
});
  }
  
}