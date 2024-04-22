import { supabase } from "../bd/supabase";

export default {
  template: `
  <div class="imagenFondo d-flex align-items-center">
      <div class="container">
          <div class="textoInicio bg-light p-4 bg-opacity-75">
              <h1 class="fw-bolder my-3">¡Bienvenido!</h1>
              <p class="fw-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, blanditiis asperiores adipisci enim repellendus numquam officia temporibus pariatur dolorum laborum officiis iure eum qui aliquid error vitae, consequatur ipsum exercitationem!
              </p>
          </div>
      </div>
  </div>
  <div class="container mt-4">
      <!-- Buscador -->
      <div class="input-group flex-nowrap w-50">
          <span class="input-group-text" id="addon-wrapping">
              <i class="bi bi-search"></i>
          </span>
          <input
              id="inputBusqueda"
              type="text"
              class="form-control"
              placeholder="Buscador"
              aria-label="Username"
              aria-describedby="addon-wrapping"
          />
          <span class="input-group-text" id="addon-wrapping">
              <i id="borrarBuscador" class="bi bi-x"></i>
          </span>
      </div>
  </div>
  <div class="container d-flex flex-wrap mt-5 col-sm-12" id="ejerciciosContainer">
      <!-- Aquí se pintarán los ejercicios -->
  </div>
  `,
  script: async () => {
      // Obtenemos los datos de la tabla de ejercicios desde Supabase
      let { data: ejercicios, error } = await supabase
          .from('ejercicios')
          .select('*');

      if (error) {
          console.error('Error obteniendo los ejercicios:', error.message);
          return;
      }

      // Función para pintar los ejercicios en la vista
      const pintarEjercicios = () => {
          const ejerciciosContainer = document.getElementById('ejerciciosContainer');
          ejerciciosContainer.innerHTML = ejercicios.map(ejercicio => `
              <div class="card me-4 mb-4" style="width: 18rem;" data-id="${ejercicio.id}">
                  <button type="button" class="btn p-0">
                      <img src="${ejercicio.foto}" class="card-img-top" alt="...">
                  </button>
                  <div class="card-body p-2">
                      <h5 class="card-title">${ejercicio.titulo}</h5>
                  </div>
              </div>
          `).join('');
      };

      // Pintamos los ejercicios al cargar la página
      pintarEjercicios();

      // Función para filtrar los ejercicios
      const filtrarEjercicios = (texto) => {
          const ejerciciosContainer = document.getElementById('ejerciciosContainer');
          ejerciciosContainer.innerHTML = ejercicios
              .filter(ejercicio => ejercicio.titulo.toLowerCase().includes(texto.toLowerCase()))
              .map(ejercicio => `
                  <div class="card me-4 mb-4" style="width: 18rem;" data-id="${ejercicio.id}">
                      <button type="button" class="btn p-0">
                          <img src="${ejercicio.foto}" class="card-img-top" alt="...">
                      </button>
                      <div class="card-body p-2">
                          <h5 class="card-title">${ejercicio.titulo}</h5>
                      </div>
                  </div>
              `).join('');
      };

      // Listener para borrar el contenido del buscador
      document.getElementById('borrarBuscador').addEventListener('click', () => {
          document.getElementById('inputBusqueda').value = '';
          pintarEjercicios();
      });

      // Listener para filtrar ejercicios mientras se escribe en el buscador
      document.getElementById('inputBusqueda').addEventListener('input', (event) => {
          filtrarEjercicios(event.target.value);
      });

      // Evento de clic para cada tarjeta de ejercicio
      document.querySelectorAll('.card').forEach(card => {
          card.addEventListener('click', () => {
              const id = card.dataset.id;
              window.location = `#/proyectoDetalle/${id}`;
          });
      });
  }
}
