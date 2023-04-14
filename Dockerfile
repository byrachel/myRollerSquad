FROM node:19.8

COPY . .
RUN npm install

RUN npx prisma generate --schema ./server/infrastructure/prisma/schema.prisma

EXPOSE 3000

CMD [ "npm", "run", "dev"]
