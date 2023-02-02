FROM node:19.5.0

# RUN mkdir /app
# WORKDIR /app

# COPY . .
# RUN npm install

ADD . /app/
WORKDIR /app
RUN npm install

EXPOSE 3000
VOLUME /app/logs

CMD [ "npm", "run", "dev" ]