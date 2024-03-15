export const register = {
    template: //html
    
    `
    <div class="container">
                <h1 class="mt-5 text-center">Registro</h1>
                <div class="m-5 mx-auto" style="max-width: 400px">
                    <form novalidate action="" class="form border shadow-sm p-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input required id="nombre" type="text" class="form-control" />
                        <div class="invalid-feedback">
                        Este campo no puede estar vacio
                        </div>
                        <label for="apellidos" class="form-label">Apellidos:</label>
                        <input required id="apellidos" type="text" class="form-control" />
                        <div class="invalid-feedback">
                            Este campo no puede estar vacio
                        </div>
                        <label for="email" class="form-label">Email:</label>
                        <input required type="email" class="form-control" />
                        <div class="invalid-feedback">
                            El formato del email no es correcto
                        </div>
                        <label for="pass" class="form-label mt-3">Contraseña:</label>
                        <input required minlength="6" id="pass" type="password" class="form-control" />
                        <div class="invalid-feedback">
                            La contraseña debe tener como mínimo 6 caracteres
                        </div>
                        <input
                        type="submit"
                        class="btn btn-primary w-100 mt-3"
                        value="Enviar"
                      />
                    </form>
                </div>
            </div>
    `
}