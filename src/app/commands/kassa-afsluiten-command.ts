import {CommandService} from '../services/command-service';
import {Command} from './command';

export class KassaAfsluitenCommand extends Command {

  private _bedrag: number;
  private _opmerking: string;

  constructor(index: number, timestamp: Date, bedrag: number, opmerking: string) {
    super(index, timestamp, 'KassaAfsluitenCommand');
    this._bedrag = bedrag;
    this._opmerking = opmerking;
  }

  execute(executor: CommandService) {
    executor.executeKassaAfsluitenCommand(this);
  }

  get bedrag(): number {
    return this._bedrag;
  }

  get opmerking(): string {
    return this._opmerking;
  }

}

