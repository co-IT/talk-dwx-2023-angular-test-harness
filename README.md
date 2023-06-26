# DWX 2023 Talk - Angular Test Harness

> brought to you with 🥰 by [co-IT.eu](https://co-it.eu) GmbH

## Inside this repository

- Mono Repository containing a
  - Angular Client
  - .Net Web-API

### Angular Client

- Tests written with [Angular Material Test Harness](https://material.angular.io/cdk/test-harnesses/overview)
- Data State is maintained by [@ngneat/query](https://github.com/ngneat/query)

### .Net Web-API

- API documented with Open API
- SQLite Database
- EntityFramework

## Written Tests

- [] Material Button
- [] Material Input
- [] Material Select
- [] Material Table

## Prerequisites

- Having .[Net 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) installed
- Having [Node 18](https://nodejs.org/en/download) installed
- \*Having [pnpm](https://pnpm.io/installation) installed
  - You also can install the dependencies with _npm_ or _yarn_.

### ⚠️ Angular 16

Currently (26.06.2023) Cypress Component Test does not support **Angular 16**.
There is a tiny fix needed to get this to work.

Therefore, look for `angularHandler.js` (%USERPROFILE%\AppData\Local\Cypress\Cache\12.11.0\Cypress\resources\app\node*modules\@packages\server\node_modules\@cypress\webpack-dev-server\dist\helpers\angularHandler.js*).
Fix the paths pointing **webpack**-configs.
The configs have been moved to the subdirectory `tools/`.

```js
// Around Line 80 (Cypress 12.15)
// BEFORE
const angularCLiModules = ['@angular-devkit/build-angular/src/utils/webpack-browser-config.js', '@angular-devkit/build-angular/src/webpack/configs/common.js', '@angular-devkit/build-angular/src/webpack/configs/styles.js', '@angular-devkit/core/src/index.js'];

// After
const angularCLiModules = ['@angular-devkit/build-angular/src/utils/webpack-browser-config.js', '@angular-devkit/build-angular/src/tools/webpack/configs/common.js', '@angular-devkit/build-angular/src/tools/webpack/configs/styles.js', '@angular-devkit/core/src/index.js'];
```

## Getting Started

```
git clone https://github.com/co-IT/talk-dwx-2023-angular-test-harness.git

cd talk-dwx-2023-angular-test-harness

pnpm i

# Console 1: Angular Client
pnpm nx serve --project insurance-documents

# Console 2: .Net Web API
pnpm nx serve --project insurance-documents.web-api

```

## Execute Tests

```
# Jest
pnpm nx run insurance-documents:test --watch

# Cypress E2E
pnpm nx run insurance-documents-e2e:e2e --watch
```
