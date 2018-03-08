.PHONY: image

APP_NAME = $(shell node -e "pkg = require('./package'); console.log(pkg.name)")
APP_VERSION = $(shell node -e "pkg = require('./package'); console.log(pkg.version)")

image:
	sed 's/"version".*/"version": "1.0.0",/g' package.json > package.json.swp
	docker build -t ${APP_NAME}:${APP_VERSION} .
