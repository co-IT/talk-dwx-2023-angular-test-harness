# DWX 2023 Talk - Angular Test Harness

> brought to you with 🥰 by [co-IT.eu](https://co-it.eu) GmbH

## Slides

- 🖌️ https://speakerdeck.com/gregonnet/angular-material-test-harness

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

- [x] Material Checkbox
- [x] Material Button
- [x] Material Input
- [x] Material Select
- [x] Material Table

## Prerequisites

- Having .[Net 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) installed
- Having [Node 18](https://nodejs.org/en/download) installed
- \*Having [pnpm](https://pnpm.io/installation) installed
  - You also can install the dependencies with _npm_ or _yarn_.
  - In our company we completely switched to _pnpm_.

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

# Cypress Component Tests
pnpm nx run insurance-documents:component-test --watch
```
