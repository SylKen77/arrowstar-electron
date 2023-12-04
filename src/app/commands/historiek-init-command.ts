import {CommandService} from '../services/command-service';
import {Command} from './command';
import {Historiek} from '../model/historiek';

export class HistoriekInitCommand extends Command {

  private readonly _historiek: Historiek;

  constructor(index: number, timestamp: Date, historiek: Historiek) {
    super(index, timestamp, 'HistoriekInitCommand');
    this._historiek = historiek;
  }

  execute(executor: CommandService) {
    executor.executeHistoriekInitCommand(this);
  }

  get historiek(): Historiek {
    return this._historiek;
  }

}

