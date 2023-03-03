import {Aankoop} from './aankoop';
import {Telling} from './telling';
import {Afsluiting} from './afsluiting';
import {DagAfrekening} from './dag-afrekening';
import {AfrekeningViaOverschrijving} from './afrekening-via-overschrijving';
import {Klant} from './klant';

export class Kassa {

  private _saldo: number;
  private _tegoed: number;
  private _tellingen: Telling[];
  private _afsluitingen: Afsluiting[];
  private _dagAfrekeningen: DagAfrekening[];
  private _afrekeningenViaOverschrijving: AfrekeningViaOverschrijving[];

  private static getVolgendeTrainingsDag(datum: Date): Date {
    if (datum.getDay() <= 3) return Kassa.stripTime(Kassa.addDays(datum, 3 - datum.getDay())); // zo, ma, di, wo
    if (datum.getDay() <= 5) return Kassa.stripTime(Kassa.addDays(datum, 5 - datum.getDay())); // do, vr
    return Kassa.stripTime(Kassa.addDays(datum, 2)); // za
  }

  private static addDays(datum: Date, days: number): Date {
    const result = new Date(datum);
    result.setDate(result.getDate() + days);
    return result;
  }

  private static stripTime(datum: Date): Date {
    const result = new Date(datum);
    result.setHours(12, 0, 0, 0);
    return result;
  }


  constructor(saldo: number) {
    this._saldo = saldo;
    this._tegoed = 0;
    this._tellingen = [];
    this._afsluitingen = [];
    this._dagAfrekeningen = [];
    this._afrekeningenViaOverschrijving = [];
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

  get afsluitingen(): Afsluiting[] {
    return this._afsluitingen;
  }

  get dagAfrekeningen(): DagAfrekening[] {
    return this._dagAfrekeningen;
  }

  get afrekeningenViaOverschrijving(): AfrekeningViaOverschrijving[] {
    return this._afrekeningenViaOverschrijving;
  }

  aankoopToevoegen(aankoop: Aankoop) {
    this._tegoed += aankoop.getBedrag();
  }

  aankoopVerwijderen(teVerwijderenAankoop: Aankoop) {
    if (teVerwijderenAankoop) {
      this._tegoed -= teVerwijderenAankoop.getBedrag();
    }
  }

  klantAfrekenen(klant: Klant, datum: Date, viaOverschrijving: boolean, bedrag: number) {
    if (!viaOverschrijving) this._saldo += bedrag;
    this._tegoed -= bedrag;
    this.voegToeAanDagAfrekening(datum, bedrag);
    if (viaOverschrijving) this._afrekeningenViaOverschrijving = [...this._afrekeningenViaOverschrijving, new AfrekeningViaOverschrijving(datum, klant, bedrag, false)];
  }

  tellingToevoegen(saldo: number, timestamp: Date, opmerking: string) {
    this._tellingen = [...this._tellingen, new Telling(this._saldo, saldo, timestamp, opmerking)];
    this._saldo = saldo;
  }

  afsluitingToevoegen(bedrag: number, timestamp: Date, opmerking: string) {
    this._afsluitingen = [...this._afsluitingen, new Afsluiting(bedrag, timestamp, opmerking)];
    this._saldo = this._saldo - bedrag;
  }

  initBedrag(bedrag: number) {
    this._saldo = bedrag;
  }

  voegToeAanDagAfrekening(datum: Date, bedrag: number) {
    this.getDagAfrekening(datum).voegBedragToe(bedrag);
  }

  getDagAfrekening(datum: Date): DagAfrekening {
    const volgendeTrainingsDag = Kassa.getVolgendeTrainingsDag(datum);
    if (this._dagAfrekeningen.length === 0) {
      const volgendeDagAfrekening = new DagAfrekening(volgendeTrainingsDag);
      this._dagAfrekeningen.push(volgendeDagAfrekening);
      return volgendeDagAfrekening;
    }

    const laatsteDagAfrekening = this._dagAfrekeningen[this._dagAfrekeningen.length - 1];
    if (laatsteDagAfrekening.datum.getTime() === volgendeTrainingsDag.getTime()) {
      return laatsteDagAfrekening;
    } else {
      const volgendeDagAfrekening = new DagAfrekening(volgendeTrainingsDag);
      this._dagAfrekeningen.push(volgendeDagAfrekening);
      return volgendeDagAfrekening;
    }
  }

}
