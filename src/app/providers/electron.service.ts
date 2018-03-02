import {Injectable} from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import {ipcRenderer} from 'electron';
import * as childProcess from 'child_process';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;
  remote;
  fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
      this.remote = window.require('electron').remote;
      this.fs = this.remote.require('fs');
    }
  }

  isElectron = () => (window && window.process && window.process.type);

  public writeLine(data: any) {
    this.fs.appendFileSync('test.txt', JSON.stringify(data) + '\n');
  }

  public readLines() {
    const LineByLineReader = this.remote.require('line-by-line');
    const lr = new LineByLineReader('test.txt');

    lr.on('error', err => console.log('linereader.error: ' + err));
    lr.on('line', line => console.log('linereader.line: ' + line));
    lr.on('end', () => console.log('linereader.end'));
  }
}
