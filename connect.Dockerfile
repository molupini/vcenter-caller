# base
FROM node:13-alpine as base

ENV NODE_ENV=development

RUN apk add --no-cache tini

WORKDIR /node

COPY ./bin/package.json ./

# need to verify below
# RUN npm config list && npm ci && npm cache clean --force
RUN npm install && npm cache clean --force

ENTRYPOINT ["/sbin/tini", "--"]


# dev
FROM base as dev

ENV NODE_ENV=development

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

ENV PATH=/node/node_modules/.bin:$PATH

RUN npm install --only=development

WORKDIR /node/app

CMD ["nodemon", "./bin/run.js", "getFolder", "--resource=datastore", "--folder=", "--regex="]

# source
FROM base as source

# ENV NODE_ENV=production

# ENV PATH=/node/node_modules/.bin:$PATH

# RUN npm install --only=production && npm cache clean --force

WORKDIR /node/app

COPY ./bin/. . 


# prod
FROM source as prod

# RUN chown -R node:node .

# ENV NODE_ENV=production

# ENV PATH=/node/node_modules/.bin:$PATH

# WORKDIR /node/app

# USER node

CMD ["node", "./bin/run.js", "getFolder", "--resource=datastore", "--folder=", "--regex="]