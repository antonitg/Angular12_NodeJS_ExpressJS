FROM node
WORKDIR /
RUN wget https://github.com/antonitg/Angular12_NodeJS_ExpressJS/archive/refs/heads/main_docker_compose.zip
RUN apt update
RUN apt install -y unzip
RUN unzip main_docker_compose.zip
WORKDIR /Angular12_NodeJS_ExpressJS-main_docker_compose/server
RUN rm -rf ../client
COPY server/config/config.json config/config.json
COPY server/config/variables.env config/variables.env
EXPOSE 4000
RUN npm install
CMD ["npm", "start"]
