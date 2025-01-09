ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION} AS base

RUN mkdir -p /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node package*.json ./

FROM base AS development-dependencies

RUN npm install

FROM base AS development

COPY --from=development-dependencies /home/node/app/node_modules ./node_modules
COPY --chown=node:node . ./

FROM development AS testing
