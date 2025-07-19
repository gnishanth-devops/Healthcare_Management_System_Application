FROM node:24

WORKDIR /app

COPY package.json .

COPY patient-service.js .

RUN npm install

USER node

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD ["patient-service.js"]