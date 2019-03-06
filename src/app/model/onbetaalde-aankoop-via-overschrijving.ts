import {Klant} from './klant';
import {Product} from './product';

export class OnbetaaldeAankoopViaOverschrijving {

  private _datum: Date;
  private _klant: Klant;
  private _product: Product;
  private _aantal: number;

  constructor(datum: Date, klant: Klant, product: Product, aantal: number) {
    this._datum = datum;
    this._klant = klant;
    this._product = product;
    this._aantal = aantal;
  }


  get datum(): Date {
    return this._datum;
  }

  get klant(): Klant {
    return this._klant;
  }

  get product(): Product {
    return this._product;
  }

  get aantal(): number {
    return this._aantal;
  }

  get bedrag(): number {
    return this._aantal * this.product.prijsLid;
  }

  voegAankoopToe() {
    this._aantal++;
  }

  verwijderAankoop() {
    this._aantal--;
  }
}
