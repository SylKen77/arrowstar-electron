import {Command} from './command';
import {CommandService} from '../services/command-service';

export class ProductWijzigenCommand extends Command {

  private readonly _productId: number;
  private readonly _productOmschrijving: string;
  private readonly _prijsLid: number;
  private readonly _prijsGast: number;

  constructor(index: number, timestamp: Date, productId: number, productOmschrijving: string, prijsLid: number, prijsGast: number) {
    super(index, timestamp, 'ProductWijzigenCommand');
    this._productId = productId;
    this._productOmschrijving = productOmschrijving;
    this._prijsLid = prijsLid;
    this._prijsGast = prijsGast;
  }

  execute(executor: CommandService) {
    executor.executeProductWijzigenCommand(this);
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
