import { ls } from './funciones'
const menuRol = {
  templateAnonimo: // html
  `
  <ul class="navbar-nav text-end me-2 mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="ms-2 btn btn-success router-link" href="#/login" >
        Iniciar sesión
        <i class="bi bi-box-arrow-in-right"></i>
      </a>
    </li>
    <li class="nav-item">
      <a class="ms-2 btn btn-outline-light router-link" href="#/registro">
        Regístrate
        <i class="bi bi-box-arrow-in-right"></i>
      </a>
    </li>
    
  </ul>
  `,
  templateRegistrado: // html
  `
  
  
  `,
  templateEntrenador: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link active router-link" aria-current="page" href="#/proyectos">EJERCICIOS</a>
    </li>
  </ul>
  `,
  templateAdmin: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link active router-link" aria-current="page" href="#/proyectos">EJERCICIOS</a>
    </li>
    <li>
      <a class="nav-link active router-link" aria-current="page" href="#/admin">Panel ADMIN</a>
    </li>
  </ul>
  `
}

const menuUsuario = {
  templateRegistrado: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img id="avatarMenu" src="images/avatar.svg" alt="" width="25" />
      </a>
      <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
        <li id="emailUserMenu" class=" text-end p-2 small">
          ${ls.getUsuario().email}
        </li>
        <li id="rolUserMenu" class=" text-end pe-2 small fst-italic">
          ${ls.getUsuario().rol}
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a 
            class="dropdown-item" 
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modalEditarPerfil"
            >
            Mi perfil
          </a>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item cerrarSesion" href="#">Cerrar sesión</a></li>
      </ul>
    </li>
  </ul>
  `,
  templateEntrenador: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item dropdown">
    <a
    class="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    >
      <img id="avatarMenu" src="images/avatar.svg" alt="" width="25" />
    </a>
      <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
        <li id="emailUserMenu" class="text-black text-center p-2 small">
          ${ls.getUsuario().email}
        </li>
        <li id="rolUserMenu" class="text-black text-center p-2 small">
          ${ls.getUsuario().rol}
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a 
            class="dropdown-item" 
            href="#"
            data-bs-toggle="modal"     data-bs-target="#modalEditarPerfil"
            >
            Mi perfil
          </a>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item cerrarSesion" href="#">Cerrar sesión</a></li>
      </ul>
    </li>
  </ul>
  
  `,
  templateAdmin: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img id="avatarMenu" src="images/avatar.svg" alt="" width="25" />
        
      </a>
      <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
        <li id="emailUserMenu" class="text-black text-center p-2 small">
          ${ls.getUsuario().email}
        </li>
        <li id="rolUserMenu" class="text-black text-center p-2 small ">
          ${ls.getUsuario().rol}
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a 
            class="dropdown-item" 
            href="#"
            data-bs-toggle="modal"     data-bs-target="#modalEditarPerfil"
            >
            Mi perfil
          </a>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item cerrarSesion" href="#">Cerrar sesión</a></li>
      </ul>
    </li>
  </ul>
  `
}

export { menuRol, menuUsuario }