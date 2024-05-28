// Gestión del localstorage
export const ls = {
  // Capturar datos de localStorage
  getUsuario: () => {
    // Definimos usuario vacío por si no hay datos en localstorage
    let usuario = {
      email: '',
      rol: '',
      avatar: '',
      nombre: '',
      apellidos: '',
      user_id: null
    };
    // Capturamos datos de localstorage
    const usuarioJSON = localStorage.getItem('usuarioVanilla');
    // Si hay un usuario logueado actualizamos usuario, sino devolvemos usuario vacío
    if (usuarioJSON) {
      // Parseamos datos de localstorage
      usuario = JSON.parse(usuarioJSON);
    }
    return usuario;
  },

  setUsuario: (usuario) => {
    // Convertir el objeto a una cadena JSON
    const usuarioJSON = JSON.stringify(usuario);
    // Guardar en localStorage
    localStorage.setItem('usuarioVanilla', usuarioJSON);
  },

  // Nueva función para obtener el ID del usuario desde localStorage
  getUserId: () => {
    const usuario = ls.getUsuario();
    return usuario.user_id;
  }
};
