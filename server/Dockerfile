FROM node
WORKDIR /
RUN wget https://github.com/antonitg/Angular12_NodeJS_ExpressJS/archive/refs/heads/main-dockerfile.zip
RUN apt update
RUN apt install -y unzip
RUN unzip main-dockerfile.zip
WORKDIR /Angular12_NodeJS_ExpressJS-main-dockerfile/server
RUN rm -rf ../client
COPY config.json config/config.json
COPY variables.env config/variables.env
EXPOSE 4000
RUN npm install
CMD ["npm", "start"]
