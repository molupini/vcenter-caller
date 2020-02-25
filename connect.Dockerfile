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
# # 1
# FOLDER,
    # DATASTORE
    # GET LIST OF FOLDERS WHICH COLORATE TO SUPPORTED CLUSTER
    # USE ID TO FIND DATA STORES BELOW
# CMD ["nodemon", "./bin/run.js", "getFolder", "--resource=datastore", "--folder=", "--regex="]
# FOLDER,
    # NETWORK
    # GET LIST OF FOLDERS WHICH COLORATE TO SUPPORTED NETWORK
    # USE ID TO FIND NETWORKS BELOW
# CMD ["nodemon", "./bin/run.js", "getFolder", "--resource=network", "--folder=", "--regex=ACI-VDS"]


# # 2
# DATASTORE, USE 2ND FUNCTION FOR % FREE
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=datastore", "--folder=group-s18672", "--regex="]
# CMD ["nodemon", "./bin/run.js", "getDataStore", "--resource=datastore", "--folder=group-s18672", "--regex="]

# NETWORK
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=network", "--folder=group-n780", "--regex=-GTI-"]
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=network", "--folder=group-n780", "--regex=-STM-"]

# OTHER
# DATACENTER
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=datacenter", "--folder=", "--regex="]

# CLUSTER
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=cluster", "--folder=BDC-DATACENTER", "--regex="]

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

CMD ["node", "./bin/run.js"]