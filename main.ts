import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve, workingDir;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
workingDir = args.filter(val => val.startsWith('--workingDir=')).map(val => val.replace('--workingDir=', '')).pop();

(global as any).workingDir = workingDir;

try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({show: false});

  win.setMenu(null);
  win.maximize();
  win.show();

  if (serve) {
    require('electron-reload')(__dirname, {});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

  initDirectories();

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
  const fs = require('fs-extra');
  fs.ensureDirSync((global as any).workingDir + '/data/backup');
  fs.ensureFileSync((global as any).workingDir + '/data/commands.txt');
}

function createBackup() {
  const log = require('electron-log');
  log.warn('Creating backup');
  const fs = require('fs-extra');
  const date = new Date();
  const day = date.getDate() > 9 ? '' + date.getDate() : '0' + date.getDate();
  const month = (date.getUTCMonth() + 1) > 9 ? '' + (date.getUTCMonth() + 1) : '0' + (date.getUTCMonth() + 1);
  const commandsFile = workingDir + '/data/commands.txt';
  const backupFile = workingDir + '/data/backup/' + date.getFullYear() + month + day + '.txt';
  fs.copySync(commandsFile, backupFile);
  log.warn('Backup created');
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

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

  app.on('quit', () => createBackup());

} catch (e) {
  // Catch Error
  // throw e;
}
