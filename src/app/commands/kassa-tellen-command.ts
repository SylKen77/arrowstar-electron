import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KassaTellenCommand extends Command {

  private readonly _saldo: number;
  private readonly _opmerking: string;

  constructor(index: number, timestamp: Date, saldo: number, opmerking: string) {
    super(index, timestamp, 'KassaTellenCommand');
    this._saldo = saldo;
    this._opmerking = opmerking;
  }

  execute(executor: CommandService) {
    executor.executeKassaTellenCommand(this);
  }

  get saldo(): number {
    return this._saldo;
  }

  get opmerking(): string {
    return this._opmerking;
  }

}
