import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantAfrekenenCommand extends Command {

  private _klantId: number;

  constructor(index: number, timestamp: Date, klantId: number) {
    super(index, timestamp, 'KlantAfrekenenCommand');
    this._klantId = klantId;
  }

  execute(executor: CommandService) {
    executor.executeKlantAfrekenenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

}
