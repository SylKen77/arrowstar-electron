import {CommandService} from '../services/command-service';
import {Command} from './command';

export class KassaInitCommand extends Command {

  private readonly _bedrag: number;

  constructor(index: number, timestamp: Date, bedrag: number) {
    super(index, timestamp, 'KassaInitCommand');
    this._bedrag = bedrag;
  }

  execute(executor: CommandService) {
    executor.executeKassaInitBedragCommand(this);
  }

  get bedrag(): number {
    return this._bedrag;
  }

}

