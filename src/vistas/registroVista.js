/* eslint-disable no-undef */
import { Perfil } from '../bd/perfil'
import { User } from '../bd/user'

export default {
  template: // html
  `
  <div class="container-fluid" style="background-image: url('./images/flexion.jpg'); background-size: cover; background-position: center;">
  <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="col-lg-4 col-md-6 col-sm-8 col-10">
          <div class="card shadow-lg rounded">
              <div class="card-body p-5">
                  <h1 class="mb-4 text-center text-primary">Registro</h1>
                  <!-- Formulario de registro -->
                  <form id="formularioRegistro" novalidate action="" class="form">
                      <!-- Nombre -->
                      <div class="mb-3">
                          <label for="nombre" class="form-label text-primary">Nombre:</label>
                          <input required id="nombre" name="nombre" type="text" class="form-control" />
                      </div>
                      <!-- Apellidos -->
                      <div class="mb-3">
                          <label for="apellidos" class="form-label text-primary">Apellidos:</label>
                          <input id="apellidos" name="apellidos" type="text" class="form-control" />
                      </div>
                      <!-- Email -->
                      <div class="mb-3">
                          <label for="email" class="form-label text-primary">Email:</label>
                          <input required id="email" name="email" type="email" class="form-control" />
                          <div class="invalid-feedback">El formato del email no es correcto</div>
                      </div>
                      <!-- Contraseña -->
                      <div class="mb-3">
                          <label for="pass" class="form-label text-primary">Contraseña:</label>
                          <input required id="pass" name="password" minlength="6" type="password" class="form-control" />
                          <div class="invalid-feedback">La contraseña debe tener como mínimo 6 caracteres</div>
                      </div>
                      <!-- Botón enviar -->
                      <input type="submit" class="btn btn-primary w-100" value="Enviar" />
                  </form>
                  <!-- Link a inicio de sesión -->
                  <a class="btn btn-secondary w-100 mt-3" href="#">¿Ya tienes cuenta? Inicia sesión</a>
              </div>
          </div>
      </div>
  </div>
</div>


  `,
  script: () => {
    console.log('vista registro cargada')
    // Validación bootstrap

    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formularioRegistro')
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
        try {
          // Capturamos datos del formulario para el registro
          const usuario = {
            email: document.getElementById('email').value,
            password: document.getElementById('pass').value
          }
          console.log('Formulario valido. Datos formulario: ', usuario)
          const user = await User.create(usuario)
          console.log('user creado', user)

          // Capturamos datos del formulario para el perfil
          const perfil = {
            ...usuario,
            user_id: user.id,
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value
          }
          // Insertamos perfil en la base de datos
          Perfil.create(perfil)

          alert('Usuario creado correctamente. Revisa tu email...')
          window.location = '#/login'
        } catch (error) {
          alert('Error al crear usuario', error)
        }
      }
    })
  }
}