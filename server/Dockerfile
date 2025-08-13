# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install deps
RUN yarn cache clean --force
RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn run build

EXPOSE 5555

CMD ["yarn", "run", "start:prod"]
