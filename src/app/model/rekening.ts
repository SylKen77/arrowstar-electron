import {RekeningLijn} from './rekening-lijn';
import {Aankoop} from './aankoop';
import {KlantType} from './klant-type';
import {Product} from './product';

export class Rekening {

  private readonly _klantId: number;
  private readonly _klantNaam: string;
  private readonly _klantType: KlantType;
  private readonly _rekeningLijnen: RekeningLijn[];

  constructor(klantId: number, klantNaam: string, klantType: KlantType, producten: Product[], aankopen: Aankoop[]) {
    this._klantId = klantId;
    this._klantNaam = klantNaam;
    this._klantType = klantType;

    this._rekeningLijnen = producten
      .filter(product => klantType === KlantType.GAST ? !product.betaalbaarViaOverschrijving : true)
      .map(product => new RekeningLijn(product, this.klantType, aankopen));
  }

  get klantId() {
    return this._klantId;
  }

  get klantNaam() {
    return this._klantNaam;
  }

  get klantType() {
    return this._klantType;
  }

  get totaal() {
    return this._rekeningLijnen.map(rl => rl.totaal).reduce((t, kost) => t + kost);
  }

  get rekeningLijnen() {
    return this._rekeningLijnen;
  }

}
