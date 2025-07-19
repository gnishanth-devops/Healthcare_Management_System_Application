FROM node:24

WORKDIR /app

COPY . /app

RUN npm install

USER node

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD ["patient-service.js"]