# Angular12_NodeJS_ExpressJS
 
# Instalacion


## Pasos

#### 1 ) Clona o descarga el repositoro.
#### 2 ) Crea en la carpeta /server/config el fichero config.json
#### 3 ) Crea la network main en docker "docker network create -d bridge main"
#### 4 ) Arranca los dos docker-compose.yml en /docker-compose.yml y /server/docker-compose.yml

## Docker compose de la raíz

En este docker compose iniciamos el servidor (express) y el cliente (angular) de nuestra aplicación y las bases de datos necesarias (mongo)
```
version: "3"
services:
  app:
    container_name: client
    build:
      dockerfile: client/Dockerfile
    ports:
      - ${CLIENT_PORT}:4200
    networks:
      - main
  server:
    container_name: server
    build:
      dockerfile: server/Dockerfile
    ports:
      - ${SERVER_PORT}:4000
    networks:
      - main
    depends_on:
      - mongo
  mongo:
    container_name: database_mongo
    image: mongo:latest
    volumes:
      - ./mongo/dump:/dump
      - ./mongo/script.sh:/docker-entrypoint-initdb.d/script.sh
    # command: mongorestore /var/dump, amb el "docker-entrypoint.... ja executa l'script"
    ports:
      - ${MONGO_PORT}:27017
    networks:
      - main
networks:
  main:
    driver: bridge
    external: true
```

Para iniciarlo (Windows) ```docker compose up```

En el podemos configurar los puertos de nuestros servicios desde el fichero .env en /

## Docker compose /server

Con este docker compose iniciamos Grafana y Prometheus para analizar y monitorizar los endpoints de nuestro servidor.

```
version: "3"
services:
  prometheus:
    image: prom/prometheus:v2.20.1
    container_name: prometheus_practica
    networks:
    - main
    ports:
    - "9090:9090"
    volumes:
    - ./prometheus:/etc/prometheus/
    command:
    - --config.file=/etc/prometheus/prometheus.yml
  grafana:
    image: grafana/grafana:latest
    container_name: grafana_practica
    networks:
    - main
    ports:
    - "3500:3000"
    volumes:
    - ./grafana:/etc/grafana/provisioning/datasources
    - myGrafanaVol:/var/lib/grafana
    environment:
      GF_AUTH_DISABLE_LOGIN_FORM: "true"  #Deshabilitar el login de acceso a Grafana
      GF_AUTH_ANONYMOUS_ENABLED: "true"   #Permitir la autenticación anónima
      GF_AUTH_ANONYMOUS_ORG_ROLE: Admin #Que el rol de autenticación anónima sea Admin
      GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1 #Que instale el plugin grafana-clock-panel 1.0.1
    depends_on:
    - prometheus
volumes:
  myGrafanaVol:
networks:
  main:
    driver: bridge
    external: true
```

Para iniciarlo (Windows) ```docker compose up```

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

## Explicación Prometheus

### Que es Prometheus?

Prometheus es un sistema de monitoreo de código abierto basado en métricas. Recopila datos de servicios y hosts mediante el envío de solicitudes HTTP en puntos finales de métricas. Luego, almacena los resultados en una base de datos de series de tiempo y los pone a disposición para análisis y alertas.

### Integración en codigo
Para integrarlo en nuestro proyecto hemos monitorizado el endpoint / en el que contamos cuantas veces se accede a el, para ello hemos utilizado la libreria [prom-client](https://www.npmjs.com/package/prom-client) y lo hemos hecho haciendo los siguientes cambios en index.js:
Importamos la libreria
```javascript
const client = require('prom-client');
```
 
 Iniciamos un contador
```javascript
const counterHomeEndpoint = new client.Counter({
    name: 'counterHomeEndpoint',
    help: 'The total number of processed requests'
});
```
Y lo ponemos en el endpoint deseado
```javascript
app.get('/', function(req, res) {
    counterHomeEndpoint.inc(); //<-- Contador
    res.json({ msg: "API REST APPBAR" });
});
```
Iniciamos las metricas y estipulamos la configuración
```javascript
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
```
Creamos el endpoint de las metricas
```javascript
app.get('/metrics', (req, res) => {
   res.set('Content-Type', client.register.contentType);
   res.end(client.register.metrics());
});
```
Información de las metricas en el endpoint indicado:

![image](https://user-images.githubusercontent.com/45063500/142939334-87982e8a-0af6-4889-9a5e-c0aa1ca7508d.png)

En ellas muestran mucha información de nuestro servidor y al final podemos observar el contador que hemos indicado

### Prometheus en el docker compose
En el docker-compose.yml que se encuentra en la carpeta /server podemos encontrar nuestro prometheus
```docker
  prometheus:
    image: prom/prometheus:v2.20.1
    container_name: prometheus_practica
    networks:
    - main
    ports:
    - "9090:9090"
    volumes:
    - ./prometheus:/etc/prometheus/
    command:
    - --config.file=/etc/prometheus/prometheus.yml
```
Con esta configuración podremos acceder a el en el puerto 9090 y cargara la configuración que le compartimos en el volumen /server/prometheus donde se encuentra su fichero de configuración
```docker
global:
  scrape_interval: 5s
  evaluation_interval: 30s

scrape_configs:
  - job_name: "servidor"
    honor_labels: true
    static_configs:
    - targets: ["server:4000"]
```
En este fichero indicamos la ip donde se encuentra nuestro servidor REST (en nuestro caso server:4000 ya que es el nombre que le indicamos en el primer docker compose)

Prometheus leera las metricas que hemos creado en el servidor:4000/metrics y las podremos ver en localhost:9090 donde tambien se vera el contador que hemos creado anteriormente en el codigo

![image](https://user-images.githubusercontent.com/45063500/142939041-f951e912-b64e-4284-aa28-0a8b2cebe47c.png)

Para ver el contador iremos a Status > Targets

![image](https://user-images.githubusercontent.com/45063500/142939134-04e10013-8df2-429b-95e3-fa6ef53fc4ef.png)

Y nos saldra listado nuestro servidor

![image](https://user-images.githubusercontent.com/45063500/142939226-bd722d7e-f442-4abb-ba49-1ede45a11964.png)

## Explicación Grafana

### ¿Que es Grafana?

Grafana es una herramienta de código abierto para el análisis y visualización de métricas. Se utiliza frecuentemente para visualizar de una forma elegante series de datos en el análisis de infraestructuras y aplicaciones.

### ¿Como usamos Grafana?

Mediante la configuración que indicamos en el docker compose esta recibe la informacion que Prometheus recoleta para poder mostrarla en graficas

### Grafana en el docker compose

```docker
grafana:
    image: grafana/grafana:latest
    container_name: grafana_practica
    networks:
    - main
    ports:
    - "3500:3000"
    volumes:
    - ./grafana:/etc/grafana/provisioning/datasources
    - myGrafanaVol:/var/lib/grafana
    environment:
      GF_AUTH_DISABLE_LOGIN_FORM: "true"  #Deshabilitar el login de acceso a Grafana
      GF_AUTH_ANONYMOUS_ENABLED: "true"   #Permitir la autenticación anónima
      GF_AUTH_ANONYMOUS_ORG_ROLE: Admin #Que el rol de autenticación anónima sea Admin
      GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1 #Que instale el plugin grafana-clock-panel 1.0.1
    depends_on:
    - prometheus
```
Indicamos que queremos el puerto 3500 en nuestro caso para ver la aplicación en nuestro localhost
Cargamos la configuración de Grafana que tenemos guardada en la carpeta /server/grafana donde se encuentra el fichero datasources.yml que indica de donde debe recibir los datos en nuestro caso indicamos la url prometheus_practica en el puerto 9090 que es el contenedor donde tenemos el Prometheus 
```docker
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    orgId: 1
    url: prometheus_practica:9090
    basicAuth: false
    isDefault: true
    editable: true
```
Modificamos las siguientes variables de entorno para que sea rapidamente accesible 
GF_AUTH_DISABLE_LOGIN_FORM: “true” Deshabilitamos el login
GF_AUTH_ANONYMOUS_ENABLED: “true” Habilitamos usuario anonimo
GF_AUTH_ANONYMOUS_ORG_ROLE: Admin Cambiamos el rol usuario anonimo a admin 
GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1 Inidcamos los plugins que deseamos instalar

Y creamos un volumen llamado myGrafanaVol donde se guardan los datos de grafana para que asi sean persistentes

### Usando Grafana

Vamos a localhost:3500 para encontrarnos el dashboard de Grafana

![image](https://user-images.githubusercontent.com/45063500/142941415-a5961144-6f62-4296-a266-14b5767c1b6e.png)

Creamos un nuevo dashboard desde la barra lateral

![image](https://user-images.githubusercontent.com/45063500/142941520-46292c0a-53b6-4f70-932b-c70c24617f8a.png)

Añadimos un panel vacio

![image](https://user-images.githubusercontent.com/45063500/142941595-b6846fc3-f18d-4f92-b14e-f37233cb1f20.png)

Y abajo en la parte de "Queries" hacemos click en Metric Browser

![image](https://user-images.githubusercontent.com/45063500/142941743-839f48ed-419c-48d4-a7d0-c1b1912a8b5e.png)

Y en desplegable seleccionamos el nombre que habiamos indicado a nuestro contador (conterHomeEndpoint en mi caso)

![image](https://user-images.githubusercontent.com/45063500/142941838-ace42846-bdfe-46a7-a25d-a3a4e0fa9aac.png)

Seleccionamos las etiquetas que nos salen disponibles

![image](https://user-images.githubusercontent.com/45063500/142942012-bf8385c8-52f3-4afd-925a-4be28923ca41.png)

En el panel de la derecha indicamos el titulo de nuestro panel

![image](https://user-images.githubusercontent.com/45063500/142942407-62a55471-253e-41b4-a8da-2df19bc3c566.png)

Arriba a la derecha le damos apply para guardar los cambios del panel

![image](https://user-images.githubusercontent.com/45063500/142942573-b6dbb647-7fb0-4e7a-b810-69ab6ddc5381.png)

Y despues al icono de guardar para guardar todo el dashboard

![image](https://user-images.githubusercontent.com/45063500/142942664-882656cc-5de8-4729-bc60-c03dacda53da.png)

Ya podremos entrar a nuestro dashboard y ver la grafica con los datos que recibe desde Prometheus

![image](https://user-images.githubusercontent.com/45063500/142942740-a31b24f8-74e2-4c63-9e95-4be13da6df77.png)

## Equipo
[Antoni Tormo Garcia](https://github.com/antonitg)
 y 
[Juan Antonio López Seguí](https://github.com/jals-es)
