# Avalith skill factory Node 2

<p>Facundo Monteagudo</p>

<p>Consignas</p>

Deberán realizar una API que contenga un Login donde el usuario al ingresar su nombre de usuario y contraseña devolverá un
token con el cual podrá hacer un request a otro endpoint GET y le responderá con un saludo con su nombre.

Para el endpoint de Login, tener en cuenta los siguientes punto:

- No se requiere el uso de una DB, se puede almacenar los datos del usuario en un archivo. La contraseña deberá
  estar guardado de manera hasheada,
- En caso de fallar, se debe enviar correctamente un mensaje de error al usuario.

- sugiero utilizar 3uT para el manejo de los tokens.

- Validar que se envíen correctamente los valores.

- NO tiene que haber nada referido a frontend, utilizar Postman o similar para hacer pruebas.

sobre el segundo endpoint, tiene que responder con "Buenos dias xl" cono en el ejercicio anterior, pero en este
caso el sistema debe usar el token para saber que usuario es, y en caso que el token no sea valido.

# Endpoints

```
/login
```

```
/greetings
```

Para el 'ACCESS_TOKEN' utilice

```
require("crypto").randomBytes(64).toString('hex')
```

Subo un .rest en la carpeta Util para testeo rapido de los endpoints.
