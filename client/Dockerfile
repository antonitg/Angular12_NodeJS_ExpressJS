FROM node
WORKDIR /client
RUN apt update -y
RUN apt install unzip -y
RUN wget https://github.com/antonitg/Angular12_NodeJS_ExpressJS/archive/refs/heads/main-dockerfile.zip
RUN unzip main-dockerfile.zip
RUN rm -rf Angular12_NodeJS_ExpressJS-main-dockerfile/server
WORKDIR /client/Angular12_NodeJS_ExpressJS-main-dockerfile/client
RUN ls
EXPOSE 4200
RUN npm install
RUN npm install -g @angular/cli
CMD ["ng","serve", "--host", "0.0.0.0"]
