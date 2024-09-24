FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . ./

ENV ORIGIN http://localhost:3500

RUN npm run build

EXPOSE 3000

CMD npm run start