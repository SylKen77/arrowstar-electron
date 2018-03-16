import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {KlantType} from './klant-type';

export class Product {

  private _productId: number;
  private _omschrijving: string;
  private _prijsLid: number;
  private _prijsGast: number;

  constructor(productToevoegenCommand: ProductToevoegenCommand) {
    this._productId = productToevoegenCommand.productId;
    this._omschrijving = productToevoegenCommand.productOmschrijving;
    this._prijsLid = productToevoegenCommand.prijsLid;
    this._prijsGast = productToevoegenCommand.prijsGast;
  }

  get productId(): number {
    return this._productId;
  }

  get omschrijving(): string {
    return this._omschrijving;
  }

  get prijsLid(): number {
    return this._prijsLid;
  }

  get prijsGast(): number {
    return this._prijsGast;
  }

  getPrijs(klantType: KlantType): number {
    return klantType === KlantType.LID ? this._prijsLid : this._prijsGast;
  }

}
