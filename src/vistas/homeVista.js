export default {
    template: // html
    `
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
   <div class="input-group flex-nowrap">
   <span class="input-group-text" id="addon-wrapping"
     ><i class="bi bi-search"></i
   ></span>
   <input
     id="inputBusqueda"
     type="text"
     class="form-control"
     placeholder="Buscador"
     aria-label="Username"
     aria-describedby="addon-wrapping"
   />
   <span class="input-group-text" id="addon-wrapping"
     ><i id="borrarBuscador" class="bi bi-x"></i
   ></span>
 </div>
</div>
</div>
    <div class="container d-flex flex-wrap mt-5 col-sm-12">
        <div class="card me-4 mb-4 " style="width: 18rem;">
           <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 1</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 2</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 3</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 4</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 5</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 6</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 7</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 8</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 9</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 10</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 11</h5>
            </div>
        </div>
        <div class="card me-4 mb-4" style="width: 18rem;">
            <button type="button" class="btn p-0"><img src="images/flexion.jpg" class="card-img-top " alt="..."></button></a>
            <div class="card-body p-2">
              <h5 class="card-title">Ejercicio 12</h5>
            </div>
        </div>
    </div>
</div>
    `,
    script: () => {

      document.querySelectorAll('.card').forEach(card => {
        // Cambia el selector a '.card, .card-body, .card-title, .card-img-top, .btn'
        card.querySelectorAll('.card-body, .card-title, .card-img-top, .btn').forEach(element => {
            element.addEventListener('click', () => {
                // Obtenemos el ID del proyecto desde el atributo data-id de la card
                const id = card.dataset.id;
                // Redirigimos a la vista de detalle del proyecto pasando el ID como parámetro
                window.location = `#/proyectoDetalle/${id}`;
            });
        });
    });

       // Función para filtrar los ejercicios
       const filtrarEjercicios = (texto) => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const titulo = card.querySelector('.card-title').innerText.toLowerCase();
            if (titulo.includes(texto.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Listener para borrar el contenido del buscador
    document.getElementById('borrarBuscador').addEventListener('click', () => {
        document.getElementById('inputBusqueda').value = '';
        filtrarEjercicios('');
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
  