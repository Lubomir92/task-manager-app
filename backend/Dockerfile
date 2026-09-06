FROM node:18-alpine

# Nainštaluj openssl pre Prisma
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]