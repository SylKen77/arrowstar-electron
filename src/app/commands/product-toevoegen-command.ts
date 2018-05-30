import {Command} from './command';
import {JsonObject, JsonProperty} from 'json2typescript';
import {CommandService} from '../services/command-service';

export class ProductToevoegenCommand extends Command {

  private _productId: number;
  private _productOmschrijving: string;
  private _prijsLid: number;
  private _prijsGast: number;

  constructor(index: number, timestamp: Date, productId: number, productOmschrijving: string, prijsLid: number, prijsGast: number) {
    super(index, timestamp, 'ProductToevoegenCommand');
    this._productId = productId;
    this._productOmschrijving = productOmschrijving;
    this._prijsLid = prijsLid;
    this._prijsGast = prijsGast;
  }

  execute(executor: CommandService) {
    executor.executeProductToevoegenCommand(this);
  }

  get productId(): number {
    return this._productId;
  }

  get productOmschrijving(): string {
    return this._productOmschrijving;
  }

  get prijsLid(): number {
    return this._prijsLid;
  }

  get prijsGast(): number {
    return this._prijsGast;
  }

}
