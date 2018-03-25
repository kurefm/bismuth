VERSION := $(shell cat VERSION)
APP_NAME := bismuth
NPM_REGISTRY := https://registry.npm.taobao.org/

.PHONY: build-app build-elasticsearch build-web config-app config-web distclean

build: build-app build-elasticsearch

build-web: config-web
	cd web && echo "Enter web directory" && \
	yarn run ember build -prod

build-app: config-app build-web
	docker build -f docker/bismuth/Dockerfile . -t $(APP_NAME):$(VERSION)	

build-elasticsearch:
	docker build -f docker/elasticsearch/Dockerfile . -t $(APP_NAME)/elasticsearch:$(VERSION)

config: config-app config-web

config-app:
	yarn install --registry $(NPM_REGISTRY)

config-web:
	cd web && echo "Enter web directory" && \
	yarn install --registry $(NPM_REGISTRY) && \
	yarn run bower install

distclean:
	rm -r web/dist