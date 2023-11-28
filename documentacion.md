# XSport Fitness
**Definición del proyecto y requisitos básicos**
El proyecto consistirá en una página sobre ejercicios fitness. En esta página se podrá ver una tabla con los ejercicios que habrá subido un usuario “entrenador”, se podrá entrar en cada ejercicio a partir de la tabla y veremos una ficha que incluirá una descripción sobre cómo llevarlo a cabo, músculos que trabajan en el ejercicio y algunas fotos/video que enseñe como se hace correctamente. Los usuarios también podrán crear sus rutinas de ejercicios, que son tablas con forma de horario en las que podrán poner los ejercicios que llevarán a cabo cada día que entrenen y podrán descargarlo. Los ejercicios los subirán los usuarios entrenadores, que así mismo estos podrán editar y eliminar los que hayan subido ellos mismos. Los administradores podrán crear, editar y eliminar entrenamientos y usuarios.


**Definición de las versiones**
**Versión 1.0**
La versión 1.0 de la página te permitirá crearte un perfil y cambiarte la foto de perfil a tu gusto, los usuarios normales podrán ver los diferentes ejercicios fitness que estarán publicadas en la página.

**Versión 2.0**
En la versión 2.0 los usuarios con el rol de entrenador, rol que tendrá que ser recibido por  los administradores de la página podrán grabar sus videos y subirlos a la página para que los usuarios registrados lo puedan ver.

**Versión 3.0**
En la versión 3.0 se le añadirá una opción a los usuarios registrados para crear su propio horario para su rutina de ejercicios y una vez acabado podrás descargarlo. 

**Versión 4.0**
En la versión 4.0 los usuarios podrán dar like, comentar en cada publicación y también guardar en favoritos los ejercicios que quieran y así únicamente irse al apartado de favoritos que cada usuario logueado tendrá y poder ver las publicaciones guardadas como favoritas.

**Versión 5.0**
En la versión 5.0 se añadirá una suscripción de pago mensual de la cual usuarios que la adquieran tendrá ventajas como hablar por privado con los usuarios con rol de entrenador para preguntar cosas sobre sus rutinas públicas y asi tener mas atención en el momento de dudas que un usuario del cual tenga la suscripción de pago.

**Diagrama de caso de uso**
La lista de los casos de uso tendrá de estructura que el rol de abajo podrá hacer todo lo que hagan los roles que estén encima:

 **1  Usuario sin loggear**
Podrá ver la tabla con los nombres de los ejercicios pero no podrá entrar en la página de cada uno para ver la descripción.

**2 Usuario loggeado**
Podrá entrar en las páginas de los ejercicios para ver las descripciones y los
videos que hay en estás páginas.
Podrá subir foto de perfil.
Podrá dar like y comentar en las páginas de los ejercicios.
Podrá crear y descargar horarios de rutinas de ejercicios.

**3 Usuario Premium**
     -	Podrá realizar las misma funciones que un usuario normal logueado, solo que se le añadirá una nueva función de poder hablar con cada entrenador que ha publicado x ejercicio fitness en la página.

**4 Entrenador**
Podrá subir contenido sobre los ejercicios como videos o fotos para dar una mejor.

**5 Administrador**
Podrá hacer CRUD de los usuarios y los ejercicios si hay algo que no es correcto.
