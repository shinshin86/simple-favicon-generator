# simple-favicon-generator

[![Build Status](https://travis-ci.org/shinshin86/simple-favicon-generator.svg?branch=main)](https://travis-ci.org/shinshin86/simple-favicon-generator)

![simple-favicon-generator logo](./logo/simple-favicon-generator-logo.png)

Simple favicon generator.

## Install

```sh
npm install simple-favicon-generator
# or
yarn add simple-favicon-generator
```

## Usage

This is the simplest sample code.

Create a `public` directory and then run it.

```javascript
const generateFavicons = require('simple-favicon-generator');

(async () => {
  const targetImage = './your-site-image.png';
  const siteName = 'Your site name';
  await generateFavicons(targetImage, siteName);
})();
```

## Development

```sh
# test
npm run test

# code format
npm run fmt
```
