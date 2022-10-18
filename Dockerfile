FROM node:14-alpine

WORKDIR /var/www

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD node ./server.js