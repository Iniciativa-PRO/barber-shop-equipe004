FROM node:alpine

WORKDIR /usr/app

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build; \
npx migrate dev 

EXPOSE 3333

CMD ["npm", "run", "start"]