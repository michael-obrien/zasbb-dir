FROM node:0.10
MAINTAINER Zas

RUN mkdir /src
ADD ./ /src

WORKDIR /src
RUN npm install

RUN npm build

ENV ZASBB_FUNCTION="Directory"
EXPOSE 10101

ENTRYPOINT ["npm", "start"]
