FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# document which port the container will listen on
EXPOSE 5000

# start your compiled server
CMD ["node", "dist/index.js"]
