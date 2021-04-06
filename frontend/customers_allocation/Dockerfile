FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]