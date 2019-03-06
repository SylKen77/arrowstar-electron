import {Command} from './command';
import {CommandService} from '../services/command-service';

export class OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand  extends Command {

  private readonly _klantId: number;
  private readonly _productId: number;

  constructor(index: number, timestamp: Date, klantId: number, productId: number) {
    super(index, timestamp, 'OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand');
    this._klantId = klantId;
    this._productId = productId;
  }

  execute(executor: CommandService) {
    executor.executeOnbetaaldeAankoopViaOverschrijvingAfrekenenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get productId(): number {
    return this._productId;
  }

}
