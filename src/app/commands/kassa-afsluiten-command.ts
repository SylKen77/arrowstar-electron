import {CommandService} from '../services/command-service';
import {Command} from './command';

export class KassaAfsluitenCommand extends Command {

  private _bedrag: number;

  constructor(index: number, timestamp: Date, bedrag: number) {
    super(index, timestamp, 'KassaAfsluitenCommand');
    this._bedrag = bedrag;
  }

  execute(executor: CommandService) {
    executor.executeKassaAfsluitenCommand(this);
  }

  get bedrag(): number {
    return this._bedrag;
  }

}

