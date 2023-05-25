FROM node

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile --no-cache

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]