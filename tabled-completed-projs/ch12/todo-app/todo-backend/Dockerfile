#use node:20 as base
FROM node:20

WORKDIR /usr/src/app

#include index js in image so we don't have to manually copy it every time
COPY --chown=node:node . .

#use node to execute
RUN npm ci

# env was oriignlaly part of teh CMD
ENV DEBUG=part-b:*

USER node

CMD npm start

