export class HistoriekJaarSamenvatting {

  private _saldoStart: number;
  private _inkomsten: number;
  private _saldoAfsluitingen: number;
  private _saldoTellingen: number;
  private _saldoOverschrijvingen: number;
  private _saldoCash: number;
  private _saldoEnd: number;

  constructor() {
    this._saldoStart = 0;
    this._saldoEnd = 0;
    this._saldoAfsluitingen = 0;
    this._saldoTellingen = 0;
    this._inkomsten = 0;
    this._saldoCash = 0;
    this._saldoOverschrijvingen = 0;
  }

  get saldoStart(): number {
    return this._saldoStart;
  }

  set saldoStart(saldoStart: number) {
    this._saldoStart = saldoStart;
  }

  get saldoEnd(): number {
    return this._saldoEnd;
  }

  set saldoEnd(saldoEnd: number) {
    this._saldoEnd = saldoEnd;
  }

  get saldoAfsluitingen(): number {
    return this._saldoAfsluitingen;
  }

  set saldoAfsluitingen(value: number) {
    this._saldoAfsluitingen = value;
  }

  get saldoTellingen(): number {
    return this._saldoTellingen;
  }

  set saldoTellingen(value: number) {
    this._saldoTellingen = value;
  }

  get inkomsten(): number {
    return this._inkomsten;
  }

  set inkomsten(value: number) {
    this._inkomsten = value;
  }

  get saldoOverschrijvingen(): number {
    return this._saldoOverschrijvingen;
  }

  set saldoOverschrijvingen(value: number) {
    this._saldoOverschrijvingen = value;
  }

  get saldoCash(): number {
    return this._saldoCash;
  }

  set saldoCash(value: number) {
    this._saldoCash = value;
  }
}
