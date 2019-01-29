import {Command} from './command';
import {CommandService} from '../services/command-service';

export class DeleteKlantCommand extends Command {

  private readonly _klantId: number;

  constructor(index: number, timestamp: Date, klantId: number) {
    super(index, timestamp, 'DeleteKlantCommand');
    this._klantId = klantId;
  }

  execute(executor: CommandService) {
    console.log('DeleteKlantCommand.execute');
    executor.executeDeleteKlantCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }


}
