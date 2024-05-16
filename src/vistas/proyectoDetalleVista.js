import { supabase } from '../bd/supabase';
import { ls } from '../componentes/funciones'


export default {
  template: `
    <div class="container" id="ejercicioDetalleContainer">
      <!-- Contenido del ejercicio detallado se inyectará aquí -->
    </div>
  `,
  script: async () => {
    const usuario = ls.getUsuario();

    const segments = window.location.hash.split('/'); // Dividir la URL en segmentos
    const idString = segments[segments.length - 1]; // Obtener el último segmento que debería contener el ID
    const id = parseInt(idString); // Convertir el ID a un número entero

    if (isNaN(id)) {
        console.error('ID no válido:', idString);
        // Podemos redirigir al usuario a una página de error o simplemente mostrar un mensaje de error
        return;
    }

    // Obtener los datos del ejercicio desde Supabase
    let { data: ejercicio, error } = await supabase
        .from('ejercicios')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error obteniendo el ejercicio:', error.message);
        return;
    }

    // Obtener los comentarios asociados con el ejercicio
    let { data: comentarios, error: comentariosError } = await supabase
        .from('comentarios')
        .select('*')
        .eq('ejercicio_id', id);

    if (comentariosError) {
        console.error('Error obteniendo los comentarios:', comentariosError.message);
        return;
    }

    // Función para generar el contenido del ejercicio detallado y los comentarios
    const generarContenidoDetalle = (ejercicio, comentarios) => {
      let comentariosHTML = '';
      if (comentarios && comentarios.length > 0) {
        comentariosHTML = comentarios.map(comment => `
        <div class="comment d-flex justify-content-between align-items-center border mb-3 p-3">
        <div>${comment.comentario}</div>
        <button class="btn btn-danger btn-sm btn-borrar-comentario" data-comentario-id="1"><i class="bi bi-trash3"></i></button>

        </div>`).join('');

      }

      return `
        <h1 class="mt-5">${ejercicio.titulo}</h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary mt-5" id="botonVolver">
            <i class="bi bi-arrow-bar-left" style="font-size: 1em;"></i>
            Volver
          </button>
        </div>
  
        <div class="row mt-2">
          <div class="col-12 col-md-4 mb-3">
            <img src="${ejercicio.gif}" alt="" class="img-fluid">
          </div>
          <div class="col-12 col-md-8">
            <p><strong>Nombre: </strong><span>${ejercicio.titulo}</span></p>
            <p><strong>Descripción: </strong><span>${ejercicio.descripcion}</span></p>
            <p><strong>Rutina Recomendada: </strong><span>${ejercicio.rutina}</span></p>
            <p><strong>Tipo de Ejercicio: </strong><span>${ejercicio.tipo}</span></p>
            <p><strong>Nivel de Dificultad: </strong><span>${ejercicio.nivel}</span></p>
            <p><strong>Equipamiento Necesario: </strong><span>${ejercicio.equipamiento}</span></p>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-success rounded-circle fs-3 shadow  mt-5" id="botonEditar">
            <i class="bi bi-pencil-fill"></i>
          </button>
  
          <button class="btn btn-sm btn-outline-danger rounded-circle fs-3 shadow  mt-5" id="botonBorrar">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
        
        <!-- Área de Comentarios -->
        <div class="mt-5">
          <h3>Comentarios</h3>
          <textarea id="txtComentario" class="form-control" rows="3"></textarea>
          <button id="btnEnviarComentario" class="btn btn-primary mt-2">Enviar Comentario</button>
          <div id="comentariosContainer" class="mt-3">
          ${comentariosHTML}
          </div>
        </div>
        
        
      `;
    };

    // Inyectar el contenido del ejercicio detallado en el contenedor
    document.getElementById('ejercicioDetalleContainer').innerHTML = generarContenidoDetalle(ejercicio, comentarios);
    
    // Deshabilitar los botones de editar y eliminar para usuarios con rol registrado
if (usuario && usuario.rol === 'registrado') {
  document.getElementById('botonEditar').style.display = 'none';
  document.getElementById('botonBorrar').style.display = 'none';
}

    // Botón volver atrás
    document.getElementById('botonVolver').addEventListener('click', () => {
      window.location = '#/home';
    });

    // Botón enviar comentario
    document.getElementById('btnEnviarComentario').addEventListener('click', async () => {
      const comentario = document.getElementById('txtComentario').value.trim();
      if (comentario === '') return;
      try {
        const { error: insertError } = await supabase
          .from('comentarios')
          .insert({ ejercicio_id: id, comentario });

        if (insertError) {
          throw insertError;
        }

        // Obtener todos los comentarios asociados al ejercicio actual después de la inserción
        const { data: nuevosComentarios, error: getComentariosError } = await supabase
          .from('comentarios')
          .select('*')
          .eq('ejercicio_id', id);

        if (getComentariosError) {
          throw getComentariosError;
        }

        // Limpiar el contenedor de comentarios antes de volver a renderizar los comentarios actualizados
        const comentariosContainer = document.getElementById('comentariosContainer');
        comentariosContainer.innerHTML = '';
        
        // Agregar todos los comentarios actualizados al contenedor de comentarios
        nuevosComentarios.forEach(comentario => {
          comentariosContainer.insertAdjacentHTML('beforeend', `<div class="comment" style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px;">${comentario.comentario}</div>`);
        });

        // Limpiar el textarea después de enviar el comentario
        document.getElementById('txtComentario').value = '';

        console.log('Comentario insertado correctamente');
      } catch (error) {
        console.error('Error al insertar comentario:', error.message);
        alert('Error al insertar comentario. Por favor, inténtalo de nuevo.');
      }
    });

    // Botón borrar ejercicio
    document.getElementById('botonBorrar').addEventListener('click', async () => {
      if (confirm('¿Estás seguro de que quieres eliminar este ejercicio?')) {
        try {
          const { error } = await supabase
            .from('ejercicios')
            .delete()
            .eq('id', id);
  
          if (error) {
            throw error;
          }
  
          alert('Ejercicio eliminado correctamente');
          console.log('Ejercicio eliminado de la base de datos');
          window.location = '#/home';
          //window.history.back(); // Redirige al usuario atrás después de eliminar el ejercicio
        } catch (error) {
          console.error('Error al eliminar ejercicio:', error.message);
          alert('Error al eliminar ejercicio. Por favor, inténtalo de nuevo.');
        }
      }
    });

    // Botón editar ejercicio
    document.getElementById('botonEditar').addEventListener('click', () => {
      // Redirige al usuario a la página de edición del ejercicio pasando el ID como parámetro
      window.location = `#/proyectoEditar/${id}`;
    });

    document.addEventListener('click', async (event) => {
      if (event.target.classList.contains('btn-borrar-comentario')) {
        const comentarioId = event.target.dataset.comentarioId;
    
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
          try {
            const { error } = await supabase
              .from('comentarios')
              .delete()
              .eq('id', comentarioId);
    
            if (error) {
              throw error;
            }
    
            alert('Comentario eliminado correctamente');
            console.log('Comentario eliminado de la base de datos');
          } catch (error) {
            console.error('Error al eliminar comentario:', error.message);
            alert('Error al eliminar comentario. Por favor, inténtalo de nuevo.');
          }
        }
      }
    });
    
    
    


}
}
