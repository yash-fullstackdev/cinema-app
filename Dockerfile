FROM node:18.10.0-alpine

WORKDIR /app

RUN npm install -g npm@9.4.1

RUN npm i -g @nestjs/cli

COPY . .

RUN npm i

RUN npm run build

WORKDIR /app

CMD ["npm","start"]