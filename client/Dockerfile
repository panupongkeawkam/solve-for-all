FROM --platform=linux/amd64 node:16-alpine

ENV PORT=$PORT

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["npm", "run", "serve"]