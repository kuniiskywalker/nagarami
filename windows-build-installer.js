/* eslint no-console:0 */
var winstaller = require('electron-winstaller');

winstaller.createWindowsInstaller({
  appDirectory: './dist/nagarami-win32-x64/',
  outputDirectory: '/tmp/build/installer64',
  authors: 'kuniiskywalker.',
  exe: 'nagarami.exe'
})
  .then(() => console.log('It worked!'))
  .catch(e => console.log(`No dice: ${e.message}`));
