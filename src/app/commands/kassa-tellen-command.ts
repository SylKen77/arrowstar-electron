import {Command} from './command';
import {JsonObject, JsonProperty} from 'json2typescript';
import {CommandService} from '../services/command-service';

@JsonObject
export class KassaTellenCommand extends Command {

  @JsonProperty('saldo', Number)
  private _saldo: number;

  constructor(index: number, timestamp: Date, saldo: number) {
    super(index, timestamp, 'KassaTellenCommand');
    this._saldo = saldo;
  }

  execute(executor: CommandService) {
    executor.executeKassaTellenCommand(this);
  }

  get saldo(): number {
    return this._saldo;
  }

}
