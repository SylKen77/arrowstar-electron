import {Command} from './command';
import {CommandService} from '../services/command-service';

export class AankoopWijzigenCommand extends Command {

  private readonly _klantId: number;
  private readonly _productId: number;
  private readonly _viaOverschrijving: boolean;

  constructor(index: number, timestamp: Date, klantId: number, productId: number, viaOverschrijving: boolean) {
    super(index, timestamp, 'AankoopWijzigenCommand');
    this._klantId = klantId;
    this._productId = productId;
    this._viaOverschrijving = viaOverschrijving;
  }

  execute(executor: CommandService) {
    return executor.executeAankoopWijzigenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get productId(): number {
    return this._productId;
  }

  get viaOverschrijving(): boolean {
    return this._viaOverschrijving;
  }

}
