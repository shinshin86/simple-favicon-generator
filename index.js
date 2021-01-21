const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const generateImage = async (imgPath, fileName, width, height = width) => {
  await sharp(imgPath).resize(width, height).toFile(fileName);
  return;
};

const generateBrowserConfigXML = async (outputPath, tileColor) => {
  const browserConfigXML = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <wide310x150logo src="/mstile-310x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <TileColor>${tileColor}</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;

  await fs.writeFile(outputPath, browserConfigXML);
  return;
};

const generateWebMaifest = async (
  outputPath,
  sitemName,
  themeColor,
  displayMode
) => {
  const webMaifestJson = {
    name: sitemName,
    short_name: sitemName,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: themeColor,
    background_color: themeColor,
    display: displayMode,
  };

  await fs.writeFile(outputPath, JSON.stringify(webMaifestJson));
  return;
};

const generateFaviconImages = async (targetImage, outputDir) => {
  await generateImage(
    targetImage,
    path.join(outputDir, 'android-chrome-192x192.png'),
    192
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'android-chrome-512x512.png'),
    512
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'apple-touch-icon.png'),
    180
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'favicon-16x16.png'),
    16
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'favicon-32x32.png'),
    32
  );

  await generateImage(targetImage, path.join(outputDir, 'favicon.ico'), 48);

  await generateImage(
    targetImage,
    path.join(outputDir, 'mstile-70x70.png'),
    70
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'mstile-150x150.png'),
    150
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'mstile-310x150.png'),
    310,
    150
  );

  await generateImage(
    targetImage,
    path.join(outputDir, 'mstile-310x310.png'),
    310
  );

  return;
};

const generateFavicons = async (
  targetImage,
  siteName,
  outputDir = 'public',
  themeColor = '#ffffff',
  displayMode = 'standalone',
  tileColor = '#da532c'
) => {
  if (!targetImage) {
    console.error('simple-favicon-generator: ERROR');
    throw new Error('targetImage is a required');
  }

  if (!siteName) {
    console.error('simple-favicon-generator: ERROR');
    throw new Error('siteName is a required');
  }

  try {
    // generate favicon images
    await generateFaviconImages(targetImage, outputDir);

    // generate browserconfig.xml
    await generateBrowserConfigXML(
      path.join(outputDir, 'browserconfig.xml'),
      tileColor
    );

    // generate site.webmanifest
    await generateWebMaifest(
      path.join(outputDir, 'site.webmanifest'),
      siteName,
      themeColor,
      displayMode
    );

    console.log('simple-favicon-generator: SUCCESS');
  } catch (err) {
    console.error('simple-favicon-generator: ERROR');
    throw err;
  }
};

module.exports = generateFavicons;
