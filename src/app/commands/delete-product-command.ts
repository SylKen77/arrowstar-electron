import {Command} from './command';
import {CommandService} from '../services/command-service';

export class DeleteProductCommand extends Command {

  private readonly _productId: number;

  constructor(index: number, timestamp: Date, productId: number) {
    super(index, timestamp, 'DeleteProductCommand');
    this._productId = productId;
  }

  execute(executor: CommandService) {
    console.log('DeleteProductCommand.execute');
    executor.executeDeleteProductCommand(this);
  }

  get productId(): number {
    return this._productId;
  }


}
