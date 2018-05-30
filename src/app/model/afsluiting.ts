export class Afsluiting {

  private _bedrag: number;
  private _timestamp: Date;
  private _opmerking: string;


  constructor(bedrag: number, timestamp: Date, opmerking: string) {
    this._bedrag = bedrag;
    this._timestamp = timestamp;
    this._opmerking = opmerking;
  }


  get bedrag(): number {
    return this._bedrag;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get opmerking(): string {
    return this._opmerking;
  }

}
