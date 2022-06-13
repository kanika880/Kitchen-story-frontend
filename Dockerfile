#stage 1
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build
#stage 2
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/Kitchen-Story-UI .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]