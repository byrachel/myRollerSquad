FROM node:19.5.0

RUN mkdir /app
WORKDIR /app

# COPY package*.json ./
COPY . .
RUN npm install

CMD [ "npm", "run", "dev" ]