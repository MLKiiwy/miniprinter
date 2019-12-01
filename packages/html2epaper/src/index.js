const { spawn } = require('child_process');
const { resolve } = require('path');
const { symlinkSync, existsSync } = require('fs');
const jimp = require('jimp');
const html2png = require('html2png');

function createLibSymlink() {
  let libraryPath;
  require.main.paths.forEach(path => {
    const testPath = resolve(
      path,
      './e-Paper/RaspberryPi&JetsonNano/python/lib'
    );
    if (existsSync(testPath)) {
      libraryPath = testPath;
    }
  });
  if (!libraryPath) {
    return false;
  }
  const libPathInPython = resolve(__dirname, '../python/lib');
  try {
    symlinkSync(libraryPath, libPathInPython, 'dir');
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
  return true;
}

module.exports = async function html2epaper(html, options = { device: '' }) {
  try {
    const pngPath = resolve(__dirname, '../python/bmp/image.png');
    const bmpPath = resolve(__dirname, '../python/bmp/image.bmp');
    console.log(html, pngPath, bmpPath);
    await html2png(html, pngPath);
    const pngfile = await jimp.read(pngPath);
    pngfile.rotate(90, false);
    await pngfile.writeAsync(bmpPath);
    createLibSymlink();
    const bmp2epaperBinPath = resolve(__dirname, '../python/bmp2epaper.py');
    const process = spawn('python', [bmp2epaperBinPath]);
    process.stdout.on('data', data => console.log(data.toString()));
  } catch (e) {
    console.error(e);
  }
};
