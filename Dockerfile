FROM node:latest
LABEL maintainer="Pipatpol Tanavongchinda <pipatpol.t@ku.th>"

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

ADD src /usr/src/app

EXPOSE 3000
CMD ["npm", "run", "serve"]
