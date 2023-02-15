FROM node:19.5.0

COPY . .
RUN npm install

RUN npx prisma generate --schema ./server/prisma/schema.prisma

EXPOSE 3000

CMD [ "npm", "run", "dev"]
