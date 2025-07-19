FROM node:24

WORKDIR /app

COPY package.json /app

COPY src/patient/patient-service.js /app
RUN npm install

USER node

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD ["patient-service.js"]