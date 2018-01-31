# TypeScript Webpack & React JS Starter Project

This is a fork of my own `webpack-ts-kit` boilerplate project that takes the
base setup and adds **React JS** & friends into the mix.

## Key Features

- Webpack v3+
- TypeScript v2.6+ (with dynamic imports & bundle splitting)
- TSLint
- Mocha unit tests
- module generator script (see below)

## Commands

There's a fair few commands defined inside package.json, but these are the
import ones to be aware of:

`npm start` — Run your local development server

`npm run build` — Compile your app into static, production-ready files

`npm run lint` — Run all linting scripts (TypeScript & stylesheets)

`npm run test` — Run tests with coverage output shown

`npm run test:watch` — Run tests continuously as files inside `src` change

`npm run gen` — Generate a new component/container/page/redux file

## Module Generator

As mentioned, I've also thrown in a generator script. The purpose of this is
to automate the creation of various kinds of modules. In the future I'll
likely make this into its own NPM module.

Run: `npm run gen` to start the generation prompt, you'll be asked a couple
questions to choose the type of module to create and the name.

For adding custom module types/names, `scripts/cc-config.json` can be
edited.

## Project Status

Ongoing development. After all, I'm still just dipping my toes into what
TypeScript is capable of, in particular when combined with React JS.

Suggestions and PRs are welcome!

## About

It was about time I got up to speed with how on earth TypeScript and React JS
can be made to play nicely together; this project is the result of having a
solid day and a half of tackling this synergy.

**Developed by [Aaron Leo Cooper](http://webdevdiaries.com) for
[2359Media](https://2359media.com)**
