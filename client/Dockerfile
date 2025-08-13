# Dev image with hot-reload
FROM node:20-alpine

WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install deps
RUN yarn cache clean --force
RUN yarn install
RUN yarn add esbuild@0.25.9 --dev

# Copy source code
COPY . .

# Expose API port
EXPOSE 5173
