export class Telling {

  private _kassaSaldo: number;
  private _tellingSaldo: number;
  private _timestamp: Date;

  constructor(kassaSaldo: number, tellingSaldo: number, timestamp: Date) {
    this._kassaSaldo = kassaSaldo;
    this._tellingSaldo = tellingSaldo;
    this._timestamp = timestamp;
  }

  get kassaSaldo(): number {
    return this._kassaSaldo;
  }

  get tellingSaldo(): number {
    return this._tellingSaldo;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  public getVerschil(): number {
    return (this._kassaSaldo - this._tellingSaldo);
  }

  public isZonderAfwijking(): boolean {
    return this.getVerschil() < 0.01;
  }

}
