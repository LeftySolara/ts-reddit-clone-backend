# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json", ".env.development", ".env", "tsconfig.json", "./"]

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 5000

EXPOSE 9229

CMD npm run dev:migrate | npx pino-pretty