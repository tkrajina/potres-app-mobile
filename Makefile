.PHONY: generate-images
generate-images:
	tools/create_pngs.sh

.PHONY: yarn-reinstall
yarn-reinstall:
	rn -Rf node_modules
	yarn install

.PHONY: yarn-install
yarn-install:
	yarn install

.PHONY: tsc-watch
tsc-watch:
	tsc --watch

.PHONY: lint
lint:
	yarn run lint

.PHONY: prettier
prettier:
	./node_modules/.bin/prettier --write $$(find src -name "*.ts*")

.PHONY: expo
expo:
	expo start

.PHONY: expo-ios
expo-ios:
	expo start --ios

.PHONY: expo-android
expo-android:
	expo start --android

.PHONY: assert-all-commited
assert-all-commited:
	$(eval GIT_PORCELAIN_STATUS := $(shell git status --porcelain))
	if [ -n "$(GIT_PORCELAIN_STATUS)" ]; \
	then \
	    echo 'YOU HAVE UNCOMMITED CHANGES'; \
	    git status; \
	    exit 1; \
	fi

.PHONY: build
build: build-android build-ios
	echo "OK"

.PHONY: build-android
build-android: assert-all-commited
	expo build:android

.PHONY: build-ios
build-ios: assert-all-commited
	expo build:ios
