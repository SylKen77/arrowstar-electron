import {Command} from './command';
import {CommandService} from '../services/command-service';

export class AankoopToevoegenCommand extends Command {

  private readonly _aankoopId: number;
  private readonly _klantId: number;
  private readonly _productId: number;
  private readonly _viaOverschrijving: boolean;

  constructor(index: number, timestamp: Date, aankoopId: number, klantId: number, productId: number, viaOverschrijving: boolean = false) {
    super(index, timestamp, 'AankoopToevoegenCommand');
    this._aankoopId = aankoopId;
    this._klantId = klantId;
    this._productId = productId;
    this._viaOverschrijving = viaOverschrijving;
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

  get viaOverschrijving(): boolean {
    return this._viaOverschrijving;
  }

}
