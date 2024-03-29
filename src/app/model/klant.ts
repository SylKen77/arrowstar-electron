import {KlantType} from './klant-type';
import {Aankoop} from './aankoop';

export class Klant {

  private _klantId: number;
  private _naam: string;
  private _klantType: KlantType;
  private _aankopen: Aankoop[];
  private _sortOrder: number;

  constructor(klantId: number, naam: string, klantType: KlantType, sortOrder: number) {
    this._klantId = klantId;
    this._naam = naam;
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

  setNaam(naam: string) {
    this._naam = naam;
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

  rekenAf(): number {
    const bedrag = this.getSchuld();
    this.getOnbetaaldeAankopen().forEach(aankoop => aankoop.setBetaald());
    return bedrag;
  }

  heeftOnbetaaldeAankopen(): boolean {
    return this._aankopen
      .some(aankoop => !aankoop.betaald);
  }

  setSortOrder(sortOrder: number) {
    this._sortOrder = sortOrder;
  }
}
