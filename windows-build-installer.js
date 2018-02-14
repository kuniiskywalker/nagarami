/* eslint no-console:0 */
var winstaller = require('electron-winstaller');

const package = require("./source/package.json");

winstaller.createWindowsInstaller({
  appDirectory: './dist/nagarami-win32-x64/',
  outputDirectory: './tmp/build/installer64',
  title: 'nagarami',
  authors: 'kuniiskywalker',
  exe: 'nagarami.exe',
  description: 'My App',
  iconUrl: 'https://raw.githubusercontent.com/kuniiskywalker/nagarami/develop/source/icon.ico',
  loadingGif: __dirname + '/loading.gif',
  setupIcon: __dirname + '/source/icon.ico',
  setupExe: 'nagarami-Setup-' + package["version"] + '.exe',
  noMsi: true
})
  .then(() => console.log('It worked!'))
  .catch(e => console.log(`No dice: ${e.message}`));
