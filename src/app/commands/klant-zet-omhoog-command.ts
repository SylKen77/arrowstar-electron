import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantZetOmhoogCommand extends Command {

  private readonly _klantId: number;

  constructor(index: number, timestamp: Date, klantId: number) {
    super(index, timestamp, 'KlantZetOmhoogCommand');
    this._klantId = klantId;
  }

  execute(executor: CommandService) {
    executor.executeKlantZetOmhoogCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

}
