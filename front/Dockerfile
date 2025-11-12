# Etapa 1: build
FROM node:22-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servidor nginx
FROM nginx:alpine

# Copiar build do React para a pasta padrão do nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expor a porta padrão do nginx
EXPOSE 80

# Rodar nginx
CMD ["nginx", "-g", "daemon off;"]
