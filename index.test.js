const generateFavicons = require('./index');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const rimraf = require('rimraf');

describe('simple-favicon-generator', () => {
  const targetImage = './logo/simple-favicon-generator-logo.png';
  const siteName = 'Minimum test site';
  const expectWebmanifest = `{"name":"Minimum test site","short_name":"Minimum test site","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#ffffff","background_color":"#ffffff","display":"standalone"}`;
  const expectBrowserConfigXML = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <wide310x150logo src="/mstile-310x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <TileColor>#da532c</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;

  describe('Default output dir: public', () => {
    const outputDir = 'public';

    test('Minimum test', async () => {
      await fsPromises.mkdir(outputDir);
      await generateFavicons(targetImage, siteName);

      const webmanifest = await fsPromises.readFile(
        path.join(outputDir, 'site.webmanifest'),
        'utf8'
      );
      expect(webmanifest).toBe(expectWebmanifest);

      const browserConfigXML = await fsPromises.readFile(
        path.join(outputDir, 'browserconfig.xml'),
        'utf8'
      );
      expect(browserConfigXML).toBe(expectBrowserConfigXML);

      expect(
        fs.existsSync(path.join(outputDir, 'android-chrome-192x192.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'android-chrome-512x512.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'apple-touch-icon.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'favicon-16x16.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'favicon-32x32.png'))
      ).toBeTruthy();
      expect(fs.existsSync(path.join(outputDir, 'favicon.ico'))).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-70x70.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-150x150.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-310x150.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-310x310.png'))
      ).toBeTruthy();

      // use sync methods
      rimraf.sync(outputDir);
    });
  });

  describe('Specify output dir: testdir', () => {
    const outputDir = 'testdir';

    test('Minimum test', async () => {
      await fsPromises.mkdir(outputDir);
      await generateFavicons(targetImage, siteName, outputDir);

      const webmanifest = await fsPromises.readFile(
        path.join(outputDir, 'site.webmanifest'),
        'utf8'
      );
      expect(webmanifest).toBe(expectWebmanifest);

      const browserConfigXML = await fsPromises.readFile(
        path.join(outputDir, 'browserconfig.xml'),
        'utf8'
      );
      expect(browserConfigXML).toBe(expectBrowserConfigXML);

      expect(
        fs.existsSync(path.join(outputDir, 'android-chrome-192x192.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'android-chrome-512x512.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'apple-touch-icon.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'favicon-16x16.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'favicon-32x32.png'))
      ).toBeTruthy();
      expect(fs.existsSync(path.join(outputDir, 'favicon.ico'))).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-70x70.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-150x150.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-310x150.png'))
      ).toBeTruthy();
      expect(
        fs.existsSync(path.join(outputDir, 'mstile-310x310.png'))
      ).toBeTruthy();

      // use sync methods
      rimraf.sync(outputDir);
    });
  });
});
