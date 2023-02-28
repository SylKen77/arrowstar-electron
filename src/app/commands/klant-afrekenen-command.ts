import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantAfrekenenCommand extends Command {

  private readonly _klantId: number;
  private readonly _viaOverschrijving: boolean;

  constructor(index: number, timestamp: Date, klantId: number, viaOverschrijving: boolean = false) {
    super(index, timestamp, 'KlantAfrekenenCommand');
    this._klantId = klantId;
    this._viaOverschrijving = viaOverschrijving;
  }

  execute(executor: CommandService) {
    executor.executeKlantAfrekenenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get viaOverschrijving(): boolean {
    return this._viaOverschrijving;
  }

}
