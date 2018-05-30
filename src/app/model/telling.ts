export class Telling {

  private _kassaSaldo: number;
  private _tellingSaldo: number;
  private _timestamp: Date;
  private _opmerking: string;

  constructor(kassaSaldo: number, tellingSaldo: number, timestamp: Date, opmerking: string) {
    this._kassaSaldo = kassaSaldo;
    this._tellingSaldo = tellingSaldo;
    this._timestamp = timestamp;
    this._opmerking = opmerking;
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

  get opmerking(): string {
    return this._opmerking;
  }

  public getVerschil(): number {
    return (this._kassaSaldo - this._tellingSaldo);
  }

  public isZonderAfwijking(): boolean {
    return this.getVerschil() < 0.01;
  }

}
