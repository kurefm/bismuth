FROM alpine:3.5

MAINTAINER Kure Fukumakoto

RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.5/main" > /etc/apk/repositories \
&& echo "https://mirrors.ustc.edu.cn/alpine/v3.5/community" >> /etc/apk/repositories \
&& echo "https://mirrors.ustc.edu.cn/alpine/edge/testing" >> /etc/apk/repositories

ENV HOME=/opt/bismuth \
    APP_HOME=/opt/bismuth

RUN mkdir -p /opt/bismuth
WORKDIR /opt/bismuth

COPY package.json ./

RUN apk add --no-cache bash nodejs nmap nmap-scripts suricata logstash

RUN npm install -save --registry=https://registry.npm.taobao.org && \
    npm install pm2 -g --registry=https://registry.npm.taobao.org && \
    npm cache clean

CMD ["bash"]
