FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install class-validator class-transformer
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD sh -c "sleep 10 && npm run start:prod"