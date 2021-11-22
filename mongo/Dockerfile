FROM mongo
WORKDIR /
RUN mkdir /dump
COPY dump /dump
COPY script.sh /docker-entrypoint-initdb.d/script.sh
EXPOSE 27017