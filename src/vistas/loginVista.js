import { perfiles } from '../bd/datosPrueba'
import { ls } from '../componentes/funciones'
import { header } from '../componentes/header'

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
    // Validación bootstrap

    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formularioLogin')
    // Detectamos su evento submit (enviar)
    formulario.addEventListener('submit', (event) => {
      // Detenemos el evento enviar (submit)
      event.preventDefault()
      event.stopPropagation()
      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
        // Y añadimos la clase 'was-validate' para que se muestren los mensajes
        formulario.classList.add('was-validated')
      } else {
        // Si valida enviamos los datos
        enviarDatos(formulario)
      }
    })

    function enviarDatos (formulario) {
      const email = formulario.email.value
      const pass = formulario.password.value

      // Buscamos el índice del email en el array perfiles
      const indexUser = perfiles.findIndex((user) => user.email === email)

      // Si encuentra un usuario
      if (indexUser >= 0) {
        // Si la contraseña es correcta
        if (perfiles[indexUser].password === pass) {
          console.log('¡Login correcto!')
          const usuario = {
            nombre: perfiles[indexUser].nombre,
            apellidos: perfiles[indexUser].apellidos,
            email: perfiles[indexUser].email,
            rol: perfiles[indexUser].rol,
            avatar: perfiles[indexUser].avatar,
            user_id: perfiles[indexUser].user_id
          }
          // Guardamos datos de usuario en localStorage
          ls.setUsuario(usuario)
          // Cargamos la página home
          window.location = '#/proyectos'
          // Actualizamos el header para que se muestren los menús que corresponden al rol
          header.script()
        } else {
          console.log('La contraseña no corresponde')
          alert('La contraseña no es correcta')
        }
      } else {
        console.log('El usuario no existe')
        alert('El usuario no existe')
      }
    }
  }
}