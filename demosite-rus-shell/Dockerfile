FROM node:18.16.0-alpine as build
LABEL stage=intermediate
WORKDIR /app

COPY /package.json ./
COPY /package-lock.json ./
RUN npm ci

COPY / /app
RUN npm run build:server:prod

FROM node:18.16.0-alpine
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3200
CMD [ "node", "/dist/server/main.js" ]