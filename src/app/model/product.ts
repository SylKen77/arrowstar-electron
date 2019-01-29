import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {KlantType} from './klant-type';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';

export class Product {

  private readonly _productId: number;
  private _omschrijving: string;
  private _prijsLid: number;
  private _prijsGast: number;
  private _sortOrder: number;

  constructor(productId: number, omschrijving: string, prijsLid: number, prijsGast: number, sortOrder: number) {
    this._productId = productId;
    this._omschrijving = omschrijving;
    this._prijsLid = prijsLid;
    this._prijsGast = prijsGast;
    this._sortOrder = sortOrder;
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

  get sortOrder(): number {
    return this._sortOrder;
  }

  getPrijs(klantType: KlantType): number {
    return klantType === KlantType.LID ? this._prijsLid : this._prijsGast;
  }

  wijzig(productWijzigenCommand: ProductWijzigenCommand) {
    this._omschrijving = productWijzigenCommand.productOmschrijving;
    this._prijsLid = productWijzigenCommand.prijsLid;
    this._prijsGast = productWijzigenCommand.prijsGast;
  }

  setSortOrder(sortOrder: number) {
    this._sortOrder = sortOrder;
  }
}
