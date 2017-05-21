FROM alpine:3.5

MAINTAINER Kure Fukumakoto

RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.5/main" > /etc/apk/repositories \
&& echo "https://mirrors.ustc.edu.cn/alpine/v3.5/community" >> /etc/apk/repositories \
&& echo "https://mirrors.ustc.edu.cn/alpine/edge/testing" >> /etc/apk/repositories

RUN apk add --no-cache nodejs \
&& npm install pm2 -g --registry=https://registry.npm.taobao.org \
&& npm cache clean

CMD ["sh"]
