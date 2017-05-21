FROM bismuth/base:0.1.0-dev

MAINTAINER Kure Fukumakoto

RUN apk add --no-cache nmap nmap-scripts suricata

RUN mkdir -p /opt/bismuth
WORKDIR /opt/bismuth

ENV HOME=/opt/bismuth

COPY src/ ./
COPY web/dist pubilc
COPY package.json ./

RUN npm install -save --registry=https://registry.npm.taobao.org
EXPOSE 8300

CMD ["pm2-docker", "app.js"]
