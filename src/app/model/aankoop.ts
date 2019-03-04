import {Product} from './product';
import {Klant} from './klant';

export class Aankoop {

  private _aankoopId: number;
  private _klant: Klant;
  private _product: Product;
  private _viaOverschrijving: boolean;
  private _betaald: boolean;

  constructor(aankoopId: number, klant: Klant, product: Product, viaOverschrijving: boolean = false) {
    this._aankoopId = aankoopId;
    this._klant = klant;
    this._product = product;
    this._viaOverschrijving = viaOverschrijving;
  }

  get aankoopId(): number {
    return this._aankoopId;
  }

  get klant(): Klant {
    return this._klant;
  }

  get product(): Product {
    return this._product;
  }

  get betaald(): boolean {
    return this._betaald;
  }

  setBetaald() {
    this._betaald = true;
  }

  getBedrag(): number {
    return this._product.getPrijs(this._klant.klantType);
  }


  set viaOverschrijving(value: boolean) {
    this._viaOverschrijving = value;
  }

  get viaOverschrijving(): boolean {
    return this._viaOverschrijving;
  }

}
