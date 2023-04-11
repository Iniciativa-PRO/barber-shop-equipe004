FROM node:alpine

WORKDIR /usr/app

COPY package*.json /usr/app/
COPY tsconfig.json /usr/app/

RUN npm install

COPY . /usr/app/

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "migrate:start"]