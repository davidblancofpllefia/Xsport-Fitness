import { ls } from '../componentes/funciones';
import { User } from '../bd/user';
import { Perfil } from '../bd/perfil';
import { header } from '../componentes/header';
import { menuUsuario } from '../componentes/menus';

export default {

  template: //html
  `
  <div class="container-fluid" style="background-image: url('./images/flexion.jpg'); background-size: cover; background-position: center;">
    <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="col-lg-4 col-md-6 col-sm-8 col-10">
            <div class="card shadow-lg rounded">
                <div class="card-body p-5">
                    <h1 class="mb-4 text-center text-primary">¡Bienvenido de vuelta!</h1>
                    <!-- Formulario de inicio de sesión (login) -->
                    <form id="formularioLogin" novalidate action="" class="form">
                        <!-- Email -->
                        <div class="mb-3">
                            <label for="emailLogin" class="form-label text-primary">Email:</label>
                            <input id="emailLogin" name="email" value="macximun3@gmail.com" required type="email" class="form-control" />
                            <div class="invalid-feedback">El formato del email no es correcto</div>
                        </div>
                        <!-- Contraseña -->
                        <div class="mb-3">
                            <label for="passLogin" class="form-label text-primary">Contraseña:</label>
                            <input value="prueba123" id="passLogin" name="password" required minlength="6" type="password" class="form-control" />
                            <div class="invalid-feedback">La contraseña debe tener como mínimo 6 caracteres</div>
                        </div>
                        <!-- Recordar contraseña -->
                        <div class="mb-3 form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label class="form-check-label text-primary" for="flexCheckChecked">Recordar sesión</label>
                        </div>
                        <!-- Link a recordar contraseña -->
                        <a class="mb-3 d-block text-end text-primary" href="#">¿Has olvidado tu contraseña?</a>
                        <!-- Botón Iniciar sesión -->
                        <input type="submit" class="btn btn-primary w-100" value="Iniciar sesión" />
                    </form>
                    <!-- Link a registro -->
                    <a class="btn btn-secondary w-100 mt-3" href="#">¿Eres nuevo? Regístrate</a>
                </div>
            </div>
        </div>
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
