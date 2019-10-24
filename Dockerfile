FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ENV PORT=8080
ENV MONGO_DB=mongodb://mongo:27017/movie-app-docker
ENV OMDB_API_KEY=""

EXPOSE 8080
CMD [ "node", "src/index.js" ]