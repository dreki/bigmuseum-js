FROM node:17.8-alpine3.14

# Install yarn
RUN apk add --update --no-cache yarn

# Important for installing node packages
WORKDIR /
COPY package.json package.json
# Install Node dependencies at `/node_modules` in the container.
RUN set -x \
    && yarn install --modules-folder=/node_modules --ignore-engines
    # && yarn global --modules-folder=/node_modules --ignore-engines add ts-node typescript '@types/node'
    # && yarn global --modules-folder=/node_modules --ignore-engines add ts
ENV PATH=/node_modules/.bin:$PATH

WORKDIR /app

CMD ["npm", "run", "dev"]
