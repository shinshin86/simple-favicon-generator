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

If you are using M1 mac, you may fail to install `sharp`, a library on which it depends.  
This is not a fundamental solution, but you can use v14 of Node.js to make the installation succeed.

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

If you want to specify the output directory, specify the third argument.

```javascript
const generateFavicons = require('simple-favicon-generator');

(async () => {
  const targetImage = './your-site-image.png';
  const siteName = 'Your site name';
  await generateFavicons(targetImage, siteName, 'output-dir');
})();
```

## Development

```sh
# test
npm run test

# code format
npm run fmt
```

## Licence

[MIT](https://github.com/shinshin86/simple-favicon-generator/blob/main/LICENSE)

## Author

[Yuki Shindo](https://shinshin86.com/en)
