FROM node:16-alpine

WORKDIR /app/server

COPY package.*json .

RUN npm install

COPY . . 

# RUN npm ci --omit = dev

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]