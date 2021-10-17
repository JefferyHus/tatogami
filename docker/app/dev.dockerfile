FROM node:14-alpine
WORKDIR /app
COPY . .
ENV NODE_ENV=development
RUN yarn
RUN yarn global add pm2
CMD [ "yarn", "start:dev" ]