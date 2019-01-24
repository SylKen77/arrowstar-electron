import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantZetOmlaagCommand extends Command {

  private readonly _klantId: number;

  constructor(index: number, timestamp: Date, klantId: number) {
    super(index, timestamp, 'KlantZetOmlaagCommand');
    this._klantId = klantId;
  }

  execute(executor: CommandService) {
    console.log('KlantZetOmlaagCommand.execute');
    executor.executeKlantZetOmlaagCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

}
