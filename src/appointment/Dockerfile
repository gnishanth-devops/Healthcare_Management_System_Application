FROM node:24

WORKDIR /app

COPY package.json /app

COPY src/appointment/appointment-service.js /app
RUN npm install

USER node

EXPOSE 3001

ENTRYPOINT [ "node" ]

CMD ["appointment-service.js"]