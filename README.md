# Angular12_NodeJS_ExpressJS
 
# Instalacion


## Pasos

#### 1 ) Clona o descarga el repositoro.
#### 2 ) Crea en la carpeta /server/config los ficheros config.json y variables.env
#### 3 ) Ejecuta script.sh
## Contenido de los ficheros config.json y variables.env

#### Contenido del fichero config.json
Aqui estan los datos de acceso a la base de datos mysql

```json
{
    "development": {
        "username": "usuario",
        "password": "constraseña",
        "database": "nombre_database",
        "host": "tu.host.com",
        "dialect": "mysql",
        "operatorsAliases": 0,
        "logging": 0
    }
}
```

#### Contenido del fichero variables.env

Aqui estan los datos de acceso a tu base de datos mongo y de los secrets que se utilizan para la contraseña, y JWT
```bash
DB_MONGO='mongodb://tu.servidormongo.com:27017/NOMBRECOLECCION'
SECRET_ID='MySecret'
SECRET_PASSWD='MySecretito'
SECRET_JWT='MySecretazo'
```


## Explicación Dockerfiles

### Dockerfile Cliente

Iniciamos el contenedor desde una imagen node ya que el cliente corre en esta tecnologia.

Se instalan los programas necesarios (unzip) y se descarga el fichero .zip de la rama main-dockerfile

Se borra las carpetas no necesarias

Se expone el puerto 4200 que es donde corre angular

Se instalan las dependencias del cliente

Y para iniciarlo finalemente se ejecuta "ng serve --host 0.0.0.0" para que sea accesible desde fuera


### Dockerfile Servidor

Iniciamos el contenedor desde una imagen node ya que el servidor corre en esta tecnologia.

Se instalan los programas necesarios (unzip) y se descarga el fichero .zip de la rama main-dockerfile

Se borra las carpetas no necesarias

Se expone el puerto 4000 que es donde corre express

Se instalan las dependencias del servidor

Se copian los ficheros config.json y variables.env que deben de estar en /server/config

Y para iniciarlo finalemente se ejecuta "npm start" que se traduce en nuestro package.json como "nodemon index.js" para ejecutarlo como demonio.

## Equipo
[Antoni Tormo Garcia](https://github.com/antonitg)
 y 
[Juan Antonio López Seguí](https://github.com/jals-es)
