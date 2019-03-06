import {Aankoop} from './aankoop';
import {Product} from './product';
import {KlantType} from './klant-type';

export class RekeningLijn {

  private readonly _productId: number;
  private readonly _productNaam: string;
  private readonly _aantal: number;
  private readonly _prijs: number;
  private readonly _betaalbaarViaOverschrijving: boolean;
  _viaOverschrijving: boolean;

  constructor(product: Product, klantType: KlantType, aankopen: Aankoop[]) {
    this._productId = product.productId;
    this._productNaam = product.omschrijving;
    this._prijs = product.getPrijs(klantType);
    this._aantal = aankopen.filter(aankoop => aankoop.product.productId === product.productId).length;
    this._betaalbaarViaOverschrijving = product.betaalbaarViaOverschrijving;
    this._viaOverschrijving = aankopen
      .filter(aankoop => aankoop.product.productId === product.productId)
      .filter(aankoop => !aankoop.betaald)
      .filter(aankoop => aankoop.viaOverschrijving)
      .length > 0;
  }

  get productId() {
    return this._productId;
  }

  get productNaam() {
    return this._productNaam;
  }

  get aantal() {
    return this._aantal;
  }

  get prijs() {
    return this._prijs;
  }

  get totaal() {
    return this._prijs * this._aantal;
  }

  get betaalbaarViaOverschrijving(): boolean {
    return this._betaalbaarViaOverschrijving;
  }

  get viaOverschrijving(): boolean {
    return this._viaOverschrijving;
  }

}
