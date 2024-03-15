export const contactanos = {
    template: //html
    
    `
    <div>
              <div class="container">
                <div class="mt-5">
                    <h1 class="fw-bold mb-4">Contactanos</h1>
                    <h2 class="fw-bolder">¡Buenas! ¿Necesitas ayuda?</h2>
                    <p class="mt-4">En Xsport Fitness estamos encantados de que cuentes con nosotros! Por ello queremos ayudarte:</p>
                    <p>
                        A continuacion dispone de un apartado de contacto donde puede enviarnos más información sobre su problema. 
                        ¡Estaremos encantados de proporcionarle nuestra ayuda!
                    </p>
                </div>
                <div>
                    <form novalidate action="" class="form">
                            
                        <!-- Nombre -->
                        <label class="form-label fw-bold mt-2" for="nombre">Nombre: </label>
                        <input required id="nombre" type="text" class="form-control" />

                        <!-- Email -->
                        <label class="form-label fw-bold mt-2" for="email">Email: </label>
                        <input required id="email" type="email" class="form-control" />

                        <!-- Estado producto -->
                        <label class="form-label mt-2 fw-bold" for="asunto">Asunto: </label>
                        <input required id="asunto" type="text" class="form-control" />

                        <!-- Mensaje -->
                        <label for="mensaje" class="fw-bold my-2">Mensaje</label>
                        <textarea required id="mensaje" class="form-control" rows="4"></textarea>

                        <!-- Submit -->
                        <input type="submit" class="btn btn-success mt-3 px-3 py-2" value="Enviar">
                    </form>
                </div>
              </div>
            </div>
    `
}