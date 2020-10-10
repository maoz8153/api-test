FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm build
EXPOSE ${PORT}
CMD [ "node", "./dist/server.js" ]
