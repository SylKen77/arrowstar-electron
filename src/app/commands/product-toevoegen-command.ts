import {Command} from './command';
import {JsonObject, JsonProperty} from 'json2typescript';
import {CommandService} from '../services/command-service';

@JsonObject
export class ProductToevoegenCommand extends Command {

  @JsonProperty('productId', Number)
  private _productId: number;
  @JsonProperty('productOmschrijving', String)
  private _productOmschrijving: string;
  @JsonProperty('prijsLid', Number)
  private _prijsLid: number;
  @JsonProperty('prijsGast', Number)
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
