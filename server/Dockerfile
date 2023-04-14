FROM node:alpine

WORKDIR /usr/app

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . /usr/app

RUN npm run build; \
npm run prisma

EXPOSE 3000

CMD ["npm", "run", "start"]