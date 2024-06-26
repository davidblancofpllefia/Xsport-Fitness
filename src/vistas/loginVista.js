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
                            <input id="emailLogin" name="email" placeholder="ejemplo@gmail.com" required type="email" class="form-control" />
                            <div class="invalid-feedback">El formato del email no es correcto</div>
                        </div>
                        <!-- Contraseña -->
                        <div class="mb-3">
                            <label for="passLogin" class="form-label text-primary">Contraseña:</label>
                            <input id="passLogin" name="password" required minlength="6" type="password" class="form-control" />
                            <div class="invalid-feedback">La contraseña debe tener como mínimo 6 caracteres</div>
                        </div>
                        <!-- Recordar contraseña -->
                        <div class="mb-3 form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label class="form-check-label text-primary" for="flexCheckChecked">Recordar sesión</label>
                        </div>
                        <!-- Botón Iniciar sesión -->
                        <input type="submit" class="btn btn-primary w-100" value="Iniciar sesión" />
                    </form>
                    <!-- Link a registro -->
                    <input type="submit" class="btn btn-secondary w-100 mt-3 botonRegistro"  value="¿Eres nuevo? Regístrate"/>
                </div>
            </div>
        </div>
    </div>
</div>
  `,
  script: () => {
    console.log('vista login cargada');
    document.querySelector('.botonRegistro').addEventListener('click', (event) => {
      // Redirigir a la página de proyectos
      window.location = '#/registro';
    })

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

          let perfilUsuario = await Perfil.getByUserId(user.id);
          
          if (!perfilUsuario) {
            perfilUsuario = await Perfil.create({ user_id: user.id, rol: 'registrado' });
          }

          // Guardamos la información del usuario en localStorage
          ls.setUsuario({
            email: user.email,
            nombre: perfilUsuario.nombre,
            apellidos: perfilUsuario.apellidos,
            avatar: perfilUsuario.avatar,
            rol: perfilUsuario.rol,
            user_id: user.id // Asegúrate de que esto se guarde correctamente
          });
          // Guardar el nombre y apellidos en localStorage
localStorage.setItem('nombreUsuario', perfilUsuario.nombre);
localStorage.setItem('apellidosUsuario', perfilUsuario.apellidos);

// Obtener el nombre del usuario del localStorage
const nombreUsuario = localStorage.getItem('nombreUsuario');
const apellidosUsuario = localStorage.getItem('apellidosUsuario');

// Utilizar el nombre del usuario en tu aplicación
console.log(`Bienvenido, ${nombreUsuario} ${apellidosUsuario}!`);

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
          case 'entrenador':
            menuUsuarioContainer.innerHTML = menuUsuario.templateEntrenador;
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
