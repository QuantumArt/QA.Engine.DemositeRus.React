FROM node:18.16.0-alpine as build
LABEL stage=intermediate
WORKDIR /app

COPY /package.json ./
COPY /package-lock.json ./
RUN npm ci

COPY / /app
RUN npm run build:server:prod

FROM nginx
RUN rm /etc/nginx/nginx.conf
COPY /nginx.conf /etc/nginx/nginx.conf

WORKDIR /app
COPY --from=build /app/dist ./
EXPOSE 80