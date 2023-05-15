import {Product} from './product';

export class HistoriekVerkoopPerProduct {

  private _productId: number;
  private _productNaam: string;
  private _aantalVerkocht: number;
  private _bedrag: number;

  constructor(product: Product) {
    this._productId = product.productId;
    this._productNaam = product.omschrijving;
    this._aantalVerkocht = 0;
    this._bedrag = 0;
  }

  get productId(): number {
    return this._productId;
  }

  get productNaam(): string {
    return this._productNaam;
  }

  get aantalVerkocht(): number {
    return this._aantalVerkocht;
  }

  set aantalVerkocht(value: number) {
    this._aantalVerkocht = value;
  }

  get bedrag(): number {
    return this._bedrag;
  }

  set bedrag(value: number) {
    this._bedrag = value;
  }
}
