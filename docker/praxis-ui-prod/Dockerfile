FROM node:16.13-alpine

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE ${PORT}
CMD [ "yarn", "start" ]