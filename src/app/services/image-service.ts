import {Injectable} from '@angular/core';
import {Image} from '../model/image';

@Injectable()
export class ImageService {

  private remote;
  private dialog;
  private fs;
  private readonly workingDir;

  static getAvatarUrl(klantId: number): string {
    return 'img://img/avatars/' + klantId + '.jpg';
  }

  constructor() {
    if (this.isElectron()) {
      this.remote = window.require('electron').remote;
      this.dialog = window.require('electron').remote.dialog;
      this.fs = window.require('fs-extra');
      this.workingDir = this.remote.getGlobal('workingDir');
    }
  }

  isElectron = () => (window && window.process && window.process.type);

  getAvatarPath(klantId: string) {
    return this.workingDir + '/img/avatars/' + klantId + '.jpg';
  }

  public heeftAvatar(klantId: number): boolean {
    return this.fs.pathExistsSync(this.getAvatarPath('' + klantId));
  }

  public saveAvatar(klantId: number, avatarImage: Image) {
    const path = this.getAvatarPath('' + klantId);
    console.log('copy avatar from ' + avatarImage.path + ' to ' + path);
    this.fs.copySync(avatarImage.path, path);
  }

  kiesAvatar(callback: (avatar: Image) => void) {
    this.dialog.showOpenDialog({filters: [{name: 'Avatars', extensions: ['jpg']}]}, filePaths => callback(this.loadFirstImage(filePaths)));
  }

  private loadFirstImage(filePaths: string[]): Image {
    if (filePaths === undefined || filePaths.length === 0) return null;
    return this.loadImage(filePaths[0]);
  }

  private loadImage(path: string): Image {
    if (this.fs.pathExistsSync(path)) {
      const content = this.fs.readFileSync(path);
      const contentBase64 = 'data:image/jpg;base64,' + content.toString('base64');
      return new Image(path, contentBase64, content);
    }
    return null;
  }


}
