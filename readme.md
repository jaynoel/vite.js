# Vite.js

[![Build Status](https://www.travis-ci.org/vitelabs/vite.js.svg?branch=master)](https://www.travis-ci.org/vitelabs/vite.js) [![Coverage Status](https://coveralls.io/repos/github/vitelabs/vite.js/badge.svg?branch=master)](https://coveralls.io/github/vitelabs/vite.js?branch=master)

The latest version of ViteJS is 2.3.6, it is not compatible with the old version: most of the package structure has been changed, including the function name, parameters, etc. Please refer to: https://vite.wiki/api/vitejs/
If you do not want to upgrade, you can continue to use the version <= 2.2.10

* Documentation: [vite.wiki](https://vite.wiki/api/vitejs/)
* Changelog: [CHANGELOG.md](./CHANGELOG.md)


## Prerequisites

* node.js
* yarn

## Build

```
yarn build
```

## Test

```
yarn test
```

## Lint

```
yarn lint
```

## Starting

1. `yarn`

2. Configure eslint in your editor, rules like '.eslintrc'.

### Branch naming rules

* Develop on branch 'dev/{version}/{function name}'
* Fixed version on branch 'dev/{version}'

* Notice 1: development branch split from `dev/{last_version}`. If `dev/{last_version}` is not exist, split from `master`

* Notice 2: change `src/type.ts`. You should run `yarn run format-type` after changing the file `src/type.ts`

#### Examples

```
'dev/2.0.0/utf8' from 'dev/1.0.0' || 'master' 
```

### Release

```bash
yarn release
```

### Commit File

```bash
yarn commit
```

