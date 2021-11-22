# Angular12_NodeJS_ExpressJS
 
# Instalacion


## Pasos

#### 1 ) Clona o descarga el repositoro.
#### 2 ) Crea en la carpeta /server/config el fichero config.json
#### 3 ) Arranca el docker-compose
## Contenido del fichero config.json

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

## Explicación Dockerfiles

### Dockerfile Cliente

Iniciamos el contenedor desde una imagen node ya que el cliente corre en esta tecnologia.

Se instalan los programas necesarios (unzip) y se descarga el fichero .zip de la rama main-dockerfile

Se borra las carpetas no necesarias

Se expone el puerto 4200 que es donde corre angular

Se instalan las dependencias del cliente

Y para iniciarlo finalemente se ejecuta "ng serve --host 0.0.0.0" para que sea accesible desde fuera

Dockerfile cliente<br>
![dockerfile_cliente](https://drive.webforshops.com/practica_docker/dockerfile_cliente.PNG)

Contenedor cliente en el docker-compose.yml<br>
![docker_compose_cliente](https://drive.webforshops.com/practica_docker/docker_compose_cliente.PNG)


### Dockerfile Servidor

Iniciamos el contenedor desde una imagen node ya que el servidor corre en esta tecnologia.

Se instalan los programas necesarios (unzip) y se descarga el fichero .zip de la rama main-dockerfile

Se borra las carpetas no necesarias

Se expone el puerto 4000 que es donde corre express

Se instalan las dependencias del servidor

Se copian los ficheros config.json y variables.env que deben de estar en /server/config

Y para iniciarlo finalemente se ejecuta "npm start" que se traduce en nuestro package.json como "nodemon index.js" para ejecutarlo como demonio.

Dockerfile servidor<br>
![dockerfile_servidor](https://drive.webforshops.com/practica_docker/dockerfile_servidor.PNG)

Contenedor servidor en el docker-compose.yml<br>
![docker_compose_servidor](https://drive.webforshops.com/practica_docker/docker_compose_servidor.PNG)

### MongoDB

En nuestro proyecto usamos mysql y mongo. Creamos un contenedor de mongo en el que importamos los datos con mongorestore

En el docker-compose.yml, copiamos la carpeta de /mongo/dump donde se encuentran los archivos de la base de datos y copiamos tambien el script.sh a la carpeta /docker-entrypoint-initdb.d para que se ejecute cuando se arranca mongo e importe los datos

De esta forma, cuando el contenedor de mongo se arranca, se ejecuta el script.sh y se importan todos los datos con el comando mongorestore

Contenedor mongo en el docker-compose.yml<br>
![docker_compose_mongo](https://drive.webforshops.com/practica_docker/docker_compose_mongo.PNG)

## Equipo
[Antoni Tormo Garcia](https://github.com/antonitg)
 y 
[Juan Antonio López Seguí](https://github.com/jals-es)
