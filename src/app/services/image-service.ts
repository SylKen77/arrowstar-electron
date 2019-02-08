import {Injectable} from '@angular/core';
import {Image} from '../model/image';

@Injectable()
export class ImageService {

  private remote;
  private dialog;
  private fs;
  private readonly workingDir;
  private readonly runningDir;

  public defaultAvatar: Image;

  private images: Image[];

  constructor() {
    this.images = [];
    if (this.isElectron()) {
      this.remote = window.require('electron').remote;
      this.dialog = window.require('electron').remote.dialog;
      this.fs = window.require('fs-extra');
      this.workingDir = this.remote.getGlobal('workingDir');
      this.runningDir = this.remote.getGlobal('runningDir');
      this.defaultAvatar = this.loadImage(this.runningDir + '/assets/defaultAvatar.jpg');
    }
  }

  isElectron = () => (window && window.process && window.process.type);

  private getImage(path: string, defaultImage?: Image): Image {
    const image = this.images.find(i => i.path === path);
    if (image) return image;
    const loadedImage = this.loadImage(path);
    if (loadedImage != null) {
      this.images.push(loadedImage);
      return loadedImage;
    } else {
      return defaultImage;
    }
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

  public saveAvatar(klantId: number, avatarImage: Image) {
    const path = this.getAvatarPath('' + klantId);
    this.images = this.images.filter(i => i.path !== path);
    this.fs.outputFile(this.getAvatarPath('' + klantId), avatarImage.content);
  }

  kiesAvatar(callback: (avatar: Image) => void) {
    this.dialog.showOpenDialog({filters: [{name: 'Avatars', extensions: ['jpg']}]}, filePaths => callback(this.loadFirstImage(filePaths)));
  }

  getAvatar(klantId: string): Image {
    return this.getImage(this.getAvatarPath(klantId), this.defaultAvatar);
  }

  getAvatarPath(klantId: string) {
    return this.workingDir + '/images/' + klantId + '.jpg';
  }

}
