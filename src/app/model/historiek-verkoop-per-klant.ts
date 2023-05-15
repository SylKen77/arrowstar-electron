import {Klant} from './klant';

export class HistoriekVerkoopPerKlant {

  private _klantId: number;
  private _klantNaam: string;
  private _aantalGekocht: number;
  private _bedrag: number;

  constructor(klant: Klant) {
    this._klantId = klant.klantId;
    this._klantNaam = klant.naam;
    this._aantalGekocht = 0;
    this._bedrag = 0;
  }


  get klantId(): number {
    return this._klantId;
  }

  get klantNaam(): string {
    return this._klantNaam;
  }

  get aantalGekocht(): number {
    return this._aantalGekocht;
  }

  set aantalGekocht(value: number) {
    this._aantalGekocht = value;
  }

  get bedrag(): number {
    return this._bedrag;
  }

  set bedrag(value: number) {
    this._bedrag = value;
  }
}
