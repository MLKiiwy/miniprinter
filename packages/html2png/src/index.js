const puppeteer = require('puppeteer');

module.exports = async function html2png(
  html,
  filepath,
  options = { width: 264, height: 176, deviceScaleFactor: 1 }
) {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    dumpio: true,
    args: ['--disable-features=VizDisplayCompositor']
  });
  console.log('new page', html);
  const page = await browser.newPage();
  console.log('page ok');
  await page.setContent(html);
  page.setViewport(options);
  console.log('screenshot');

  await page.screenshot({
    fullPage: true,
    path: filepath
  });

  await browser.close();

  return filepath;
};
