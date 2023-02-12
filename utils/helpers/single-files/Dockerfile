FROM node:16-buster

ENV APP_DIR=/srv/node \
  PORT=80

WORKDIR /srv/node

COPY . .

RUN export DEBIAN_FRONTEND="noninteractive"
RUN apt-get update
RUN apt-get install -y git \
  openssh-client \
  curl \
  python3 \
  python3-pip \
  unzip \
  ca-certificates \
  gnupg \
  lsb-release \
  sudo

RUN unset DEBIAN_FRONTEND

RUN npm install

RUN npm run build

EXPOSE 80

CMD npm run start