FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --omit=dev
COPY . .
RUN npm run build || true
CMD ["npm", "start"]
