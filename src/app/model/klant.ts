import {KlantType} from './klant-type';
import {Aankoop} from './aankoop';

export class Klant {

  private _klantId: number;
  private _naam: string;
  private _voornaam: string;
  private _klantType: KlantType;
  private _aankopen: Aankoop[];

  constructor(klantId: number, naam: string, voornaam: string, klantType: KlantType) {
    this._klantId = klantId;
    this._naam = naam;
    this._voornaam = voornaam;
    this._klantType = klantType;
    this._aankopen = [];
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

  aankoopToevoegen(aankoop: Aankoop) {
    this._aankopen = [...this._aankopen, aankoop];
  }

  aankoopVerwijderen(teVerwijderenAankoop: Aankoop | undefined) {
    if (teVerwijderenAankoop) this._aankopen = this._aankopen.filter(aankoop => aankoop !== teVerwijderenAankoop);
  }

  getOnbetaaldeAankopen(): Aankoop[] {
    return this._aankopen.filter(aankoop => !aankoop.betaald);
  }

  heeftOnbetaaldeAankopen(): boolean {
    return this._aankopen.some(aankoop => !aankoop.betaald);
  }

}
