// loginVista.js
import { ls } from '../componentes/funciones'
import { User } from '../bd/user'
import { header } from '../componentes/header'
import { menuUsuario } from '../componentes/menus'

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5 text-center">Inicia sesión</h1>
  <div class="m-5 mx-auto" style="max-width: 400px">
    <!-- Formulario de inicio de sesión (login) -->
    <form id="formularioLogin" novalidate action="" class="form border shadow-sm p-3">
      <!-- Email -->
      <label for="emailLogin" class="form-label">Email:</label>
      <input id="emailLogin" name="email" value="ejemplo@email.com" required type="email" class="form-control" />
      <div class="invalid-feedback">El formato del email no es correcto</div>
      <!-- Contraseña -->
      <label for="passLogin" class="form-label mt-3">Contraseña:</label>
      <input value="123456" id="passLogin" name="password" required minlength="6" type="password" class="form-control" />
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

    <a class="d-block mt-5 btn btn-secondary mx-auto" href="#"
      >¿Eres nuevo? Regístrate</a
    >
  </div>
</div>
  `,
  script: () => {
    console.log('vista login cargada')

    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formularioLogin')

    // Detectamos su evento submit (enviar)
    formulario.addEventListener('submit', async (event) => {
      // Detenemos el evento enviar (submit)
      event.preventDefault()
      event.stopPropagation()

      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
        // Y añadimos la clase 'was-validate' para que se muestren los mensajes
        formulario.classList.add('was-validated')
      } else {
        // Si valida, intentamos iniciar sesión
        const email = formulario.email.value
        const password = formulario.password.value

        try {
          // Iniciamos sesión utilizando Supabase
          const user = await User.login({ email, password })

          // Si el inicio de sesión es exitoso, almacenamos el usuario en el localStorage
          ls.setUsuario({
            email: user.email,
            rol: 'logueado',
            avatar: '', // Puedes actualizar esto si obtienes el avatar del usuario desde Supabase
          })

          // Redirigimos al usuario a la página de proyectos
          window.location = '#/home'

          // Actualizamos el header para que se muestren los menús correspondientes al rol
          header.script()

          // Mostramos el menú de usuario
          mostrarMenuUsuario()
        } catch (error) {
          // Si hay un error al iniciar sesión, mostramos un mensaje de error
          console.error('Error al iniciar sesión:', error.message)
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.')
        }
      }
    })

   // Función para mostrar el menú de usuario
function mostrarMenuUsuario() {
  // Capturamos el contenedor del menú de usuario
  const menuUsuarioContainer = document.querySelector('#menuUsuario')

  // Si hay un contenedor y el usuario está logueado
  if (menuUsuarioContainer && ls.getUsuario().rol === 'logueado') {
    // Limpiamos el contenedor
    menuUsuarioContainer.innerHTML = ''

    // Agregamos el HTML del menú de usuario correspondiente al rol
    switch (ls.getUsuario().rol) {
      case 'registrado':
        menuUsuarioContainer.innerHTML = menuUsuario.templateRegistrado
        break
      case 'desarrollador':
        menuUsuarioContainer.innerHTML = menuUsuario.templateDesarrollador
        break
      case 'admin':
        menuUsuarioContainer.innerHTML = menuUsuario.templateAdmin
        break
      default:
        // Si el rol no coincide con ninguno de los casos anteriores, no mostramos ningún menú
        break
    }
  }
}
  }
}
