FROM alpine:3.7

LABEL maintainer="kure.fukumakoto@gmail.com"

ENV HOME=/opt/bismuth \
    APP_HOME=/opt/bismuth \
    NODE_ENV=production

RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.7/main" > /etc/apk/repositories && \
    echo "https://mirrors.ustc.edu.cn/alpine/v3.7/community" >> /etc/apk/repositories && \
    echo "https://mirrors.ustc.edu.cn/alpine/edge/testing" >> /etc/apk/repositories

RUN mkdir -p /opt/bismuth
WORKDIR /opt/bismuth

RUN apk add --no-cache bash nodejs yarn nmap nmap-scripts suricata logstash && \
    rm /usr/share/logstash/data && \
    yarn global add pm2 --registry=https://registry.npm.taobao.org && \
    yarn cache clean

COPY package.json yarn.lock ./
RUN yarn install --production --registry=https://registry.npm.taobao.org && \
    yarn cache clean

COPY src/ ./
COPY web/dist pubilc

RUN if [[ -f .identity ]]; then rm .identity; fi

EXPOSE 8300

CMD ["pm2-docker", "app.js"]
