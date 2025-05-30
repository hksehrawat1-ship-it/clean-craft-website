# Step 1: Use Node.js image to build the React app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev"]

