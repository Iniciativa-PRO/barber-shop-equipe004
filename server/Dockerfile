FROM node:alpine

WORKDIR /usr/app

COPY package*.json /usr/app
COPY tsconfig.json /usr/app

#NODE_ENV=development 
RUN npm install

COPY . /usr/app

# RUN npm run prisma:migrate

# EXPOSE 3000

# CMD ["npm", "run", "dev"]