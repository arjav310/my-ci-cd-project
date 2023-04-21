FROM node:18.4.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --loglevel verbose

COPY . .

CMD ["npm", "run", "start"]