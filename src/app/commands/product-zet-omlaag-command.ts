import {Command} from './command';
import {CommandService} from '../services/command-service';

export class ProductZetOmlaagCommand extends Command {

  private readonly _productId: number;

  constructor(index: number, timestamp: Date, productId: number) {
    super(index, timestamp, 'ProductZetOmlaagCommand');
    this._productId = productId;
  }

  execute(executor: CommandService) {
    executor.executeProductZetOmlaagCommand(this);
  }

  get productId(): number {
    return this._productId;
  }

}
