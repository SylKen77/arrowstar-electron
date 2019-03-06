import {Command} from './command';
import {CommandService} from '../services/command-service';

export class ProductZetOmhoogCommand extends Command {

  private readonly _productId: number;

  constructor(index: number, timestamp: Date, productId: number) {
    super(index, timestamp, 'ProductZetOmhoogCommand');
    this._productId = productId;
  }

  execute(executor: CommandService) {
    executor.executeProductZetOmhoogCommand(this);
  }

  get productId(): number {
    return this._productId;
  }

}
