import {Aankoop} from './aankoop';
import {Telling} from './telling';
import {Afsluiting} from './afsluiting';

export class Kassa {

  private _saldo: number;
  private _tegoed: number;
  private _tellingen: Telling[];
  private _afsluitingen: Afsluiting[];

  constructor(saldo: number) {
    this._saldo = saldo;
    this._tegoed = 0;
    this._tellingen = [];
    this._afsluitingen = [];
  }

  get saldo(): number {
    return this._saldo;
  }

  get tegoed(): number {
    return this._tegoed;
  }

  get tellingen(): Telling[] {
    return this._tellingen;
  }

  aankoopToevoegen(aankoop: Aankoop) {
    this._tegoed += aankoop.getBedrag();
  }

  aankoopVerwijderen(teVerwijderenAankoop: Aankoop) {
    this._tegoed -= teVerwijderenAankoop.getBedrag();
  }

  aankoopAfrekenen(aankoop: Aankoop) {
    const bedrag = aankoop.getBedrag();
    this._saldo += bedrag;
    this._tegoed -= bedrag;
  }

  tellingToevoegen(saldo: number, timestamp: Date, opmerking: string) {
    this._tellingen = [...this._tellingen, new Telling(this._saldo, saldo, timestamp, opmerking)];
    this._saldo = saldo;
  }

  afsluitingToevoegen(bedrag: number, timestamp: Date, opmerking: string) {
    this._afsluitingen = [...this._afsluitingen, new Afsluiting(bedrag, timestamp, opmerking)];
    this._saldo = this._saldo - bedrag;
  }

}
