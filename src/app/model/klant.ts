import {KlantType} from './klant-type';
import {Aankoop} from './aankoop';

export class Klant {

  private _klantId: number;
  private _naam: string;
  private _voornaam: string;
  private _klantType: KlantType;
  private _aankopen: Aankoop[];
  private _sortOrder: number;

  constructor(klantId: number, naam: string, voornaam: string, klantType: KlantType, sortOrder: number) {
    this._klantId = klantId;
    this._naam = naam;
    this._voornaam = voornaam;
    this._klantType = klantType;
    this._aankopen = [];
    this._sortOrder = sortOrder;
  }

  get klantId() {
    return this._klantId;
  }

  get naam(): string {
    return this._naam;
  }

  get voornaam(): string {
    return this._voornaam;
  }

  get klantType(): KlantType {
    return this._klantType;
  }

  get aankopen(): Aankoop[] {
    return this._aankopen;
  }

  get sortOrder(): number {
    return this._sortOrder;
  }

  aankoopToevoegen(aankoop: Aankoop) {
    this._aankopen = [...this._aankopen, aankoop];
  }

  aankoopVerwijderen(teVerwijderenAankoop: Aankoop | undefined) {
    if (teVerwijderenAankoop) this._aankopen = this._aankopen.filter(aankoop => aankoop !== teVerwijderenAankoop);
  }

  getOnbetaaldeAankopen(): Aankoop[] {
    return this._aankopen.filter(aankoop => !aankoop.betaald);
  }

  getSchuld(): number {
    return this.getOnbetaaldeAankopen().map(aankoop => aankoop.getBedrag()).reduce((p, c) => (p + c), 0);
  }

  heeftOnbetaaldeAankopen(): boolean {
    return this._aankopen.some(aankoop => !aankoop.betaald);
  }

  setSortOrder(sortOrder: number) {
    this._sortOrder = sortOrder;
  }
}
