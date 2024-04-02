
// Import all of Bootstrap's JS
import 'bootstrap'

// Import our custom CSS
import './scss/styles.scss'


import { header } from './componentes/header'
import { footer } from './componentes/footer'
import { login } from './vistas/login'
import { register } from './vistas/register'

// Importamos la vista por defecto (que será home)
async function cargarVista () {
  const componente = await import('./vistas/homeVista')
  const vista = componente.default
  // Inyectamos la vista home
  document.querySelector('main').innerHTML = vista.template
}
cargarVista()

//Inyectamos el componente header
document.querySelector('header').innerHTML = header.template

//Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template

const botonSesion = document.querySelector("#botonSesion")
botonSesion.addEventListener('click', cargarLogin)
 function cargarLogin(){
    document.querySelector('main').innerHTML = login.template
 }

 const botonRegistro = document.querySelector("#botonRegistro")
 botonRegistro = document.querySelector('click', cargarRegistro)
 function cargarRegistro(){
  document.querySelector('main').innerHTML = register.template
}