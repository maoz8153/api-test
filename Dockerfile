FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE ${PORT}
CMD [ "npm", "run", "dev" ]
