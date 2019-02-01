export class Image {

  private _path: string;
  private _contentBase64: string;
  private _content: any;

  constructor(path: string, contentBase64: string, content: any) {
    this._path = path;
    this._contentBase64 = contentBase64;
    this._content = content;
  }

  get path(): string {
    return this._path;
  }

  get contentBase64(): string {
    return this._contentBase64;
  }

  get content(): any {
    return this._content;
  }

}
