import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hola Supabase</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

//************ 

  console.log("PRUEBAS SUPABASE")

  import { createClient } from '@supabase/supabase-js'
   const supabaseUrl = 'https://fkxucwzdtusaefgysoog.supabase.co'
   const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZreHVjd3pkdHVzYWVmZ3lzb29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2Mzk0MjksImV4cCI6MjAyMjIxNTQyOX0.uto3Yhbuhts13IW527tKrDNstxdO_w-Gr1nLf2lozFI'
   const supabase = createClient(supabaseUrl, SUPABASE_KEY)

   // Mostramos por consola la conexión establecida
  console.log('conexión', supabase)
  

  //Probamos la api de las tablas
//función para Leer perfiles
const leerPerfiles = async ()=>{
  try {
    let { data: perfiles, error1 } = await supabase
  .from('perfiles')
  .select('*')
  console.log('perfiles', perfiles);
  } catch (error) {
    console.log(error);
  }
}
// Ejecutamos la función
await leerPerfiles()


//Tabla proyectos
  
   //READ ALL ROWS
   const leerDatos = async ()=>{
  try {
    let { data: proyectos, error1 } = await supabase
  .from('proyectos')
  .select('*')
  console.log('proyectos', proyectos);
  } catch (error) {
    console.log(error);
  }
}
// Ejecutamos la función
await leerDatos()

  
  
  //  Prueba a insertar un nuevo proyecto en la tabla proyectos. Ten en cuenta que en el user_id debes usar un UUID real que corresponda a uno de tus usuarios registrados

const insertarProyecto = async ()=>{
const { data, error3 } = await supabase
.from('proyectos')
.insert([
  { some_column: 'someValue', other_column: 'otherValue' },
])
.select()
console.log('insertar proyectos', insertarProyecto);
}
await insertarProyecto()

// Prueba a leer ese proyecto en concreto a partir de su ID tabla proyectos.

const leerProyecto = async ()=>{
  try {
    let { data: proyectos, error4 } = await supabase
  .from('proyectos')
  .select('user_id')
  console.log('leer proyectos con id', proyectos);
  } catch (error) {
    console.log(error);
  }
}
// Ejecutamos la función
await leerProyecto()
 

  // Prueba a borrar ese proyecto. A continuación muestra todos los proyectos de nuevo para verificar que efectivamente se ha borrado.
  
const { error } = await supabase
.from('proyectos')
.delete()
.eq('some_column', 'someValue')



// funcion login

const login = async ()=>{
  try {
    //USER LOGIN
    let { data, error } = await supabase.auth.signInWithPassword({
    email: 'hijoputa@fpllefia.com',
    password: '123456'
    })
    console.log('login', data);
  } catch (error) {
    console.log(error);
  }
}

await login()

//Consultando datos de usuario logueado
const getUser = async ()=>{
  try {
    //GET USER
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Consultamos datos de usuario con getUser(): ', user);
  } catch (error) {
    console.log(error);
  }
}

await getUser()

// Probamos a cerrar sesión
const logout = async ()=>{
  try {
    let { error } = await supabase.auth.signOut()
    console.log('Sesión cerrada con exito: ');
  } catch (error) {
    console.log(error);
  }
}
// Cerramos sesión 
await logout()
// Probamos a mostrar datos de usuario logueado. Debería darnos null 
await getUser()

//Función proyectosDetalleTodos
//Probamos la api de las funciones
const proyectoDetalleTodos = async ()=>{
  try {
    let { data, error } = await supabase
    .rpc('proyecto_detalle_todos')
    console.log('Consulta a la función proyecto_detalle_todos: ', data);
  } catch (error) {
    console.log(error);
  }

}
await proyectoDetalleTodos()


