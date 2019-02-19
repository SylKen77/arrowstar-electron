import {app, BrowserWindow, screen, protocol} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

(global as any).workingDir = __dirname;
(global as any).runningDir = app.getAppPath();

try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({show: false, webPreferences: {webSecurity: false}});

  win.setMenu(null);
  win.maximize();
  win.show();

  if (serve) {
    require('electron-reload')(__dirname, {});
    win.loadURL('http://localhost:4200');
  } else {
    global.Buffer = global.Buffer || require('buffer').Buffer;
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

  initDirectories();
  createBackup();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

function initDirectories() {

  const log = require('electron-log');
  log.warn('Initalizing filesystem');
  log.warn(app.getPath('appData'));
  log.warn(app.getPath('exe'));
  log.warn(app.getPath('exe').substring(0, app.getPath('exe').lastIndexOf('\\')));
  log.warn(app.getAppPath());
  const fs = require('fs-extra');
  fs.ensureDirSync((global as any).workingDir + '/data/backup');
  fs.ensureDirSync((global as any).workingDir + '/img/avatars');
  fs.ensureFileSync((global as any).workingDir + '/data/commands.txt');
}

function createBackup() {
  global.Buffer = global.Buffer || require('buffer').Buffer;

  const log = require('electron-log');
  log.warn('Creating backup');
  const fs = require('fs-extra');
  const date = new Date();
  const day = date.getDate() > 9 ? '' + date.getDate() : '0' + date.getDate();
  const month = (date.getUTCMonth() + 1) > 9 ? '' + (date.getUTCMonth() + 1) : '0' + (date.getUTCMonth() + 1);
  const commandsFile = (global as any).workingDir + '/data/commands.txt';
  const backupFile = (global as any).workingDir + '/data/backup/' + date.getFullYear() + month + day + '.txt';
  fs.copySync(commandsFile, backupFile);
  log.warn('Backup created');
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    protocol.interceptFileProtocol('file', (request, callback) => {
      let imgUrl = request.url.substr(7);    /* all urls start with 'file://' */
      if (imgUrl.endsWith('/')) imgUrl = imgUrl.substring(0, imgUrl.length - 1);

      const filePath = path.normalize(`${__dirname}/${imgUrl}`);
      console.log('intercept ' + imgUrl + ' to ' + filePath);
      callback(filePath);
    }, (err) => {
      if (err) console.error('Failed to register protocol');
    });
    createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  // app.on('quit', () => createBackup());

} catch (e) {
  // Catch Error
  // throw e;
}
