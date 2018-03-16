import {Command} from './command';
import {CommandService} from '../services/command-service';

export class AankoopToevoegenCommand extends Command {

  private _aankoopId: number;
  private _klantId: number;
  private _productId: number;

  constructor(index: number, timestamp: Date, aankoopId: number, klantId: number, productId: number) {
    super(index, timestamp, 'AankoopToevoegenCommand');
    this._klantId = klantId;
    this._productId = productId;
  }

  execute(executor: CommandService) {
    return executor.executeAankoopToevoegenCommand(this);
  }

  get aankoopId(): number {
    return this._aankoopId;
  }

  get klantId(): number {
    return this._klantId;
  }

  get productId(): number {
    return this._productId;
  }

}
