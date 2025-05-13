FROM node:24-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]