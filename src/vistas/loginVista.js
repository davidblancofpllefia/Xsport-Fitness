import { ls } from '../componentes/funciones';
import { User } from '../bd/user';
import { Perfil } from '../bd/perfil';
import { header } from '../componentes/header';
import { menuUsuario } from '../componentes/menus';

export default {

  template: `
    <div class="container">
      <h1 class="mt-5 text-center">Inicia sesión</h1>
      <div class="m-5 mx-auto" style="max-width: 400px">
        <!-- Formulario de inicio de sesión (login) -->
        <form id="formularioLogin" novalidate action="" class="form border shadow-sm p-3">
          <!-- Email -->
          <label for="emailLogin" class="form-label">Email:</label>
          <input id="emailLogin" name="email" value="prueba@gmail.com" required type="email" class="form-control" />
          <div class="invalid-feedback">El formato del email no es correcto</div>
          <!-- Contraseña -->
          <label for="passLogin" class="form-label mt-3">Contraseña:</label>
          <input value="prueba123" id="passLogin" name="password" required minlength="6" type="password" class="form-control" />
          <div class="invalid-feedback">
            La contraseña debe tener como mínimo 6 caracteres
          </div>


          <!-- Recordar contraseña -->
          <div class="form-check mt-3">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked
            />
            <label class="form-check-label" for="flexCheckChecked">
              Recordar sesión
            </label>
          </div>

          <!-- Link a recordar contraseña -->
          <a class="d-block text-end" href="#">¿Has olvidado tu contraseña?</a>

          <!-- Botón Iniciar sesión -->
          <input
            type="submit"
            class="btn btn-primary w-100 mt-3"
            value="Iniciar sesión"
          />
        </form>

        <a class="d-block mt-5 btn btn-secondary mx-auto" href="#">¿Eres nuevo? Regístrate</a>
      </div>
    </div>
  `,
  script: () => {
    console.log('vista login cargada');

    const formulario = document.querySelector('#formularioLogin');

    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
      } else {
        const email = formulario.email.value;
        const password = formulario.password.value;

        try {
          const user = await User.login({ email, password });

          // Verificamos si ya existe un perfil para este usuario
          let perfilUsuario = await Perfil.getByUserId(user.id);
          
          if (!perfilUsuario) {
            // Si no existe, creamos un nuevo perfil con rol 'registrado'
            perfilUsuario = await Perfil.create({ user_id: user.id, rol: 'registrado' });
          }

          // Guardamos la información del usuario en localStorage
          ls.setUsuario({
            email: user.email,
            rol: perfilUsuario.rol,
            avatar: '', // Puedes actualizar esto si obtienes el avatar del usuario desde Supabase
          });

          window.location = '#/home';

          header.script();
          console.log("Has iniciado sesión");
          mostrarMenuUsuario();
        } catch (error) {
          console.error('Error al iniciar sesión:', error.message);
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
      }
    });

    function mostrarMenuUsuario() {
      const menuUsuarioContainer = document.querySelector('#menuUsuario');

      if (menuUsuarioContainer && ls.getUsuario().rol === 'logueado') {
        menuUsuarioContainer.innerHTML = '';

        switch (ls.getUsuario().rol) {
          case 'registrado':
            menuUsuarioContainer.innerHTML = menuUsuario.templateRegistrado;
            break;
          case 'desarrollador':
            menuUsuarioContainer.innerHTML = menuUsuario.templateDesarrollador;
            break;
          case 'admin':
            menuUsuarioContainer.innerHTML = menuUsuario.templateAdmin;
            break;
          default:
            break;
        }
      }
    }
  }
};
