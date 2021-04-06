FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN apk update && apk add bash
RUN ["npm", "ci"]

# Bundle app source
COPY . .

# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh

EXPOSE 80
CMD ["./wait-for-it.sh", "back-mysql:3306", "--", "node", "app.js"]
