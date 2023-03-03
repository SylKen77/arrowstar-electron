import {Klant} from './klant';
import {generate} from 'rxjs/observable/generate';

export class AfrekeningViaOverschrijving {

  private _datum: Date;
  private _klant: Klant;
  private _bedrag: number;
  private _geverifieerd: boolean;

  constructor(datum: Date, klant: Klant, bedrag: number, geverifieerd: boolean) {
    this._datum = datum;
    this._klant = klant;
    this._bedrag = bedrag;
    this._geverifieerd = geverifieerd;
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

  get geverifieerd(): boolean {
    return this._geverifieerd;
  }

  public setGeverifieerd(geverifieerd: boolean) {
    this._geverifieerd = geverifieerd;
  }
}
