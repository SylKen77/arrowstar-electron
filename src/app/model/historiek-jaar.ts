import {HistoriekJaarSamenvatting} from './historiek-jaar-samenvatting';
import {HistoriekTelling} from './historiek-telling';
import {HistoriekAfsluiting} from './historiek-afsluiting';
import {HistoriekVerkoopPerProduct} from './historiek-verkoop-per-product';
import {HistoriekVerkoopPerKlant} from './historiek-verkoop-per-klant';
import {Product} from './product';
import {Klant} from './klant';


export class HistoriekJaar {

  _jaar: number;
  private _samenvatting: HistoriekJaarSamenvatting;
  private _tellingen: HistoriekTelling[];
  private _afsluitingen: HistoriekAfsluiting[];
  private _verkoopPerProduct: HistoriekVerkoopPerProduct[];
  private _verkoopPerKlant: HistoriekVerkoopPerKlant[];

  constructor(jaar: number, data?: any) {
    this._jaar = jaar;
    if (data) this._samenvatting = new HistoriekJaarSamenvatting(data._samenvatting);
    else this._samenvatting = new HistoriekJaarSamenvatting();
    this._tellingen = [];
    this._afsluitingen = [];
    this._verkoopPerProduct = [];
    this._verkoopPerKlant = []
  }

  clearDetails() {
    this._tellingen = [];
    this._afsluitingen = [];
    this._verkoopPerProduct = [];
    this._verkoopPerKlant = [];
  }

  get jaar(): number {
    return this._jaar;
  }

  get samenvatting(): HistoriekJaarSamenvatting {
    return this._samenvatting;
  }

  get tellingen(): HistoriekTelling[] {
    return this._tellingen;
  }

  get afsluitingen(): HistoriekAfsluiting[] {
    return this._afsluitingen;
  }

  get verkoopPerProduct(): HistoriekVerkoopPerProduct[] {
    return this._verkoopPerProduct;
  }

  get verkoopPerKlant(): HistoriekVerkoopPerKlant[] {
    return this._verkoopPerKlant;
  }

  addTelling(telling: HistoriekTelling) {
    this._tellingen = [...this._tellingen, telling];
  }

  addAfluiting(afsluiting: HistoriekAfsluiting) {
    this._afsluitingen = [...this._afsluitingen, afsluiting];
  }

  getOrCreateVerkoopPerProduct(product: Product): HistoriekVerkoopPerProduct {
    let verkoopPerProduct = this._verkoopPerProduct.find(vp => vp.productId === product.productId);
    if (verkoopPerProduct === undefined) {
      verkoopPerProduct = new HistoriekVerkoopPerProduct(product);
      this._verkoopPerProduct = [...this._verkoopPerProduct, verkoopPerProduct];
    }
    return verkoopPerProduct;
  }

  getOrCreateVerkoopPerKlant(klant: Klant): HistoriekVerkoopPerKlant {
    let verkoopPerKlant = this._verkoopPerKlant.find(vpk => vpk.klantId === klant.klantId);
    if (verkoopPerKlant === undefined) {
      verkoopPerKlant = new HistoriekVerkoopPerKlant(klant);
      this._verkoopPerKlant = [...this._verkoopPerKlant, verkoopPerKlant];
      this._verkoopPerKlant.sort((vk1, vk2) => vk1.klantId - vk2.klantId);
    }
    return verkoopPerKlant;
  }


}
