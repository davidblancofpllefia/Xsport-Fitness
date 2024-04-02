import { login } from "../vistas/login";
export const header = {
    template: //html
    `
    <body class="pt-5" style="overflow-x: hidden; padding-bottom: 100px">
    <header>
            <nav class="navbar navbar-expand-lg fixed-top">
                <div class="container">
                    <div class="imgnav">
                        <a class="navbar-brand" href="../../index.html"
                        ><img
                            src="../img/logo.png"
                            alt="Logo Xsport Fitness"
                            class="d-inline-block  object-fit-cover"
                        /></a
                    >
                    </div>
                   
                        <!-- Menú ROL -->
                        <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active text-light " aria-current="page" href="#">PROYECTOS</a>
                            </li>
                            <li class="nav-item dropdown ">
                                <a
                                    class="nav-link dropdown-toggle text-light"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img src="../img/iconoUsuario.svg" alt="" width="30" />
                                </a>
                                <!-- Menú usuario -->
                                <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
                                    <li class=" text-center p-2">
                                        <p>user@email.com</p>
                                    </li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            type="button"
                                            class="dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                        >
                                            Editar perfil
                                        </button>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Otra acción</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><button id="botonSesion" class="dropdown-item" href="#">Cerrar sesión</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- VEntana edición perfil -->

            <!-- Modal -->
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
            <!-- Formulario de edición de perfil -->
                <form action="">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content ">
                            <div class="modal-header container-lg ">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">
                                    Editar perfil
                                </h1>
                            </div>
                            <div class="container d-flex row">
                                <div class="mx-5 col-6">     
                                <label for="nombre" class="form-label mt-5 ">Nombre:</label>
                                <input required id="nombre" type="text" class="form-control" />
                                

                                <label for="apellidos" class="form-label mt-3">Apellidos:</label>
                                <input id="apellidos" type="text" class="form-control" />
                                

                                <label for="email" class="form-label mt-3">Email:</label>
                                <input required id="email" type="email" class="form-control" />
                                

                                <label for="pass" class="form-label mt-3">Contraseña:</label>
                                <input required id="pass" type="password" class="form-control mb-5" />
                                </div>
                                <div class="col-4 ">
                                <button class="btn botonUsuario"><img src="../img/iconoUsuario.svg" alt=""></button>
                                <i class="bi bi-pencil float-end bg-primary text-light p-3 rounded rounded-circle  iconoImagen"></i>
                                <label for="imagen" class="form-label mt-3 d-flex">URL imagen:</label>
                                            <input
                                                id="imagen"
                                                type="url"
                                                class="form-control"
                                                value=""
                                            />
                                </div>
                               </div>
                               <div class="modal-footer d">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <button type="button" class="btn btn-primary">Guardar cambios</button>
                            </div>
                            </div> 
                        </div>
                    </div>
                </form>

            </div>
        </header>
        </body>
    `,

    script: () => {
       // Captura del elemento <li> con el enlace dentro
     const elementoCerrarSesion = document.querySelector('li > a.dropdown-item[href="#"]');

// Verificación de si se encontró el elemento
if (elementoCerrarSesion) {
    // Acción a realizar cuando se encuentre el elemento
    elementoCerrarSesion.addEventListener('click', function(event) {
        // Evita que el enlace realice su acción por defecto (navegar a '#')
        event.preventDefault();
        
        // Aquí puedes agregar tu lógica para cerrar la sesión
        console.log('Cerrando sesión...');
        // Por ejemplo, puedes llamar a una función que maneje el cierre de sesión
        // cerrarSesion();
    });
} else {
    console.log('No se encontró el elemento para cerrar sesión.');
}
}
}