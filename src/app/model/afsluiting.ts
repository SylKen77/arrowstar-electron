export class Afsluiting {

  private _bedrag: number;
  private _timestamp: Date;


  constructor(bedrag: number, timestamp: Date) {
    this._bedrag = bedrag;
    this._timestamp = timestamp;
  }


  get bedrag(): number {
    return this._bedrag;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

}
