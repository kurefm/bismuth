FROM bismuth/perpare:0.1.0-dev

MAINTAINER Kure Fukumakoto

COPY src/ ./
COPY web/dist pubilc

RUN rm .identity

ENV NODE_ENV=production

EXPOSE 8300

CMD ["pm2-docker", "app.js"]
