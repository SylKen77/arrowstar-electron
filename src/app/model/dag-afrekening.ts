export class DagAfrekening {

  private _datum: Date;
  private _bedrag: number;

  constructor(datum: Date) {
    this._datum = datum;
    this._datum.setHours(12, 0, 0, 0);
    this._bedrag = 0;
  }

  get datum() {
    return this._datum;
  }

  get bedrag() {
    return this._bedrag;
  }

  voegBedragToe(bedrag: number) {
    this._bedrag += bedrag;
  }

}
