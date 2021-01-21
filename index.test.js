const generateFavicons = require('./index');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const rimraf = require('rimraf');

describe('simple-favicon-generator', () => {
  test('Minimum test', async () => {
    const targetImage = './logo/simple-favicon-generator-logo.png';
    const siteName = 'Minimum test site';
    const defaultOutputDir = './public';

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

    await fsPromises.mkdir(defaultOutputDir);
    await generateFavicons(targetImage, siteName);

    const webmanifest = await fsPromises.readFile(
      path.join(defaultOutputDir, 'site.webmanifest'),
      'utf8'
    );
    expect(webmanifest).toBe(expectWebmanifest);

    const browserConfigXML = await fsPromises.readFile(
      path.join(defaultOutputDir, 'browserconfig.xml'),
      'utf8'
    );
    expect(browserConfigXML).toBe(expectBrowserConfigXML);

    expect(
      fs.existsSync(path.join(defaultOutputDir, 'android-chrome-192x192.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'android-chrome-512x512.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'apple-touch-icon.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'favicon-16x16.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'favicon-32x32.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'favicon.ico'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'mstile-70x70.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'mstile-150x150.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'mstile-310x150.png'))
    ).toBeTruthy();
    expect(
      fs.existsSync(path.join(defaultOutputDir, 'mstile-310x310.png'))
    ).toBeTruthy();

    // use sync methods
    rimraf.sync(defaultOutputDir);
  });
});
