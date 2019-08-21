FROM node:10

WORKDIR /starter
ENV NODE_ENV development

COPY package.json /starter/package.json

RUN yarn install --production

COPY .env.example /starter/.env.example
COPY . /starter

CMD ["yarn","start"]

EXPOSE 8080
