import {Command} from './command';
import {CommandService} from '../services/command-service';

export class AankoopVerwijderenCommand extends Command {

  private _klantId: number;
  private _productId: number;

  constructor(index: number, timestamp: Date, klantId: number, productId: number) {
    super(index, timestamp, 'AankoopVerwijderenCommand');
    this._klantId = klantId;
    this._productId = productId;
  }

  execute(executor: CommandService) {
    executor.executeAankoopVerwijderenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get productId(): number {
    return this._productId;
  }

}
