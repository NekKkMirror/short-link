FROM node:22-slim AS base

RUN mkdir -p /home/node/app && \
    chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

COPY --chown=node:node . .

USER node

FROM base AS development
