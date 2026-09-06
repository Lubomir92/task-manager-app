FROM node:18-alpine

# Nainštaluj openssl pre Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Skopíruj package.json a nainštaluj závislosti
COPY package*.json ./
RUN npm install

# Skopíruj zvyšok súborov
COPY . .

# Vygeneruj Prisma client
RUN npx prisma generate

# Skompiluj TypeScript
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]