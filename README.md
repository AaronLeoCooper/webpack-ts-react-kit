# TypeScript Webpack & React JS Starter Project

This is a fork of my own `webpack-ts-kit` boilerplate project that takes the
base setup and adds **React JS** & friends into the mix.

## Key Features

- Webpack v3+
- TypeScript v2.6+ (with dynamic imports & bundle splitting)
- TSLint
- Mocha unit tests

## Commands

There's a fair few commands defined inside package.json, but these are the
import ones to be aware of:

`npm start` — Run your local development server

`npm run build` — Compile your app into static, production-ready files

`npm run lint` — Run all linting scripts (TypeScript & stylesheets)

`npm run test` — Run tests with coverage output shown

`npm run test:watch` — Run tests continuously as files inside `src` change

## Module Generator

...will be coming soon!

I build one originally to work inside this project, but have removed those
source files and dependencies as I'm working on creating a dedicated CLI
for that. It will be added back into this project as a dependency soon.

## Project Status

Ongoing development. After all, I'm still just dipping my toes into what
TypeScript is capable of, in particular when combined with React JS.

Suggestions and PRs are welcome!

## Todos

- [ ] Hoist file generator logic & dependencies out of this repo into its
own repo & NPM package

## About

It was about time I got up to speed with how on earth TypeScript and React JS
can be made to play nicely together; this project is the result of having a
solid couple of days of tackling this synergy.

**Developed by [Aaron Leo Cooper](http://webdevdiaries.com) for
[2359Media](https://2359media.com)**
