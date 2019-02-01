import {Injectable} from '@angular/core';
import {Image} from '../model/image';

@Injectable()
export class ImageService {

  private remote;
  private dialog;
  private fs;
  private workingDir;

  public defaultAvatar: Image;

  private images: Image[];

  constructor() {
    this.images = [];
    if (this.isElectron()) {
      this.remote = window.require('electron').remote;
      this.dialog = window.require('electron').remote.dialog;
      this.fs = window.require('fs-extra');
      this.workingDir = this.remote.getGlobal('workingDir');

      const defaultAvatarContent = this.fs.readFileSync('./assets/defaultAvatar.jpg');
      const defaultAvatarContentBase64 = 'data:image/jpg;base64,' + defaultAvatarContent.toString('base64');
      this.defaultAvatar = new Image('./assets/defaultAvatar.jpg', defaultAvatarContentBase64, defaultAvatarContent);
    }
  }

  isElectron = () => (window && window.process && window.process.type);

  private getImage(path: string): Image {
    console.log('getImage: ' + path);
    const image = this.images.find(i => i.path === path);
    if (image) return image;
    else {
      const loadedImage = this.loadImage(path);
      this.images.push(loadedImage);
      return loadedImage;
    }
  }

  private loadImage(path: string): Image {
    console.log('loadImage: ' + path);
    if (this.fs.pathExistsSync(path)) {
      const content = this.fs.readFileSync(path);
      const contentBase64 = 'data:image/jpg;base64,' + content.toString('base64');
      return new Image(path, contentBase64, content);
    } else {
      return this.defaultAvatar;
    }
  }

  public saveAvatar(klantId: number, avatarImage: Image) {
    const path = this.getAvatarPath('' + klantId);
    this.images = this.images.filter(i => i.path !== path);
    console.log('saveAvatar: ', path);
    this.fs.outputFile(this.getAvatarPath('' + klantId), avatarImage.content);
  }

  kiesAvatar(callback: (avatar: Image) => void) {
    this.dialog.showOpenDialog({filters: [{name: 'Avatars', extensions: ['jpg']}]}, filePaths => callback(this.loadFirstImage(filePaths)));
  }

  private loadFirstImage(filePaths: string[]): Image|undefined {
    if (filePaths === undefined || filePaths.length === 0) return;
    const content = this.fs.readFileSync(filePaths[0]);
    const contentBase64 = 'data:image/jpg;base64,' + content.toString('base64');
    return new Image(filePaths[0], contentBase64, content);
  }

  getAvatar(klantId: string): Image {
    return this.getImage(this.getAvatarPath(klantId));
  }

  getAvatarPath(klantId: string) {
    return this.workingDir + '/images/' + klantId + '.jpg';
  }

}
