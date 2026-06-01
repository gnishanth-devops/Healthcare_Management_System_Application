# Stage 1 - Build Dependencies
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Stage 2 - Runtime Image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

USER node

EXPOSE 3001

ENTRYPOINT ["node"]

CMD ["appointment-service.js"]
