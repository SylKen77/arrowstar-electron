export class HistoriekAfsluiting {

  private _datum: Date;
  private _bedrag: number;
  private _opmerking: string;

  constructor(datum: Date, bedrag: number, opmerking: string) {
    this._datum = datum;
    this._bedrag = bedrag;
    this._opmerking = opmerking;
  }

  get datum(): Date {
    return this._datum;
  }

  set datum(value: Date) {
    this._datum = value;
  }

  get bedrag(): number {
    return this._bedrag;
  }

  set bedrag(value: number) {
    this._bedrag = value;
  }

  get opmerking(): string {
    return this._opmerking;
  }

  set opmerking(value: string) {
    this._opmerking = value;
  }
}
