import {Klant} from './klant';

export class AfrekeningViaOverschrijving {

  private _datum: Date;
  private _klant: Klant;
  private _bedrag: number;

  constructor(datum: Date, klant: Klant, bedrag: number) {
    this._datum = datum;
    this._klant = klant;
    this._bedrag = bedrag;
  }

  get datum(): Date {
    return this._datum;
  }

  get klant(): Klant {
    return this._klant;
  }

  get bedrag(): number {
    return this._bedrag;
  }

}
