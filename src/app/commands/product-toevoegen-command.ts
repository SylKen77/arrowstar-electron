import {Command} from './command';
import {CommandService} from '../services/command-service';

export class ProductToevoegenCommand extends Command {

  private readonly _productId: number;
  private readonly _productOmschrijving: string;
  private readonly _prijsLid: number;
  private readonly _prijsGast: number;
  private readonly _betaalbaarViaOverschrijving: boolean;

  constructor(index: number, timestamp: Date, productId: number, productOmschrijving: string, prijsLid: number, prijsGast: number, betaalbaarViaOverschrijving: boolean = false) {
    super(index, timestamp, 'ProductToevoegenCommand');
    this._productId = productId;
    this._productOmschrijving = productOmschrijving;
    this._prijsLid = prijsLid;
    this._prijsGast = prijsGast;
    this._betaalbaarViaOverschrijving = betaalbaarViaOverschrijving;
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

  get betaalbaarViaOverschrijving(): boolean {
    return this._betaalbaarViaOverschrijving;
  }

}
