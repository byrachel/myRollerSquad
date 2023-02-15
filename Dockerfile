FROM node:19.5.0

# WORKDIR /app

COPY . .
RUN npm install

RUN npx prisma generate --schema ./server/prisma/schema.prisma

EXPOSE 3000
# VOLUME /app/logs

CMD [ "npm", "run", "dev"]
