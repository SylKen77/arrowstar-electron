import {Command} from './command';
import {CommandService} from '../services/command-service';

export class AfrekeningViaOverschrijvingVerifierenCommand extends Command {

  private readonly _klantId: number;
  private readonly _datum: Date;
  private readonly _bedrag: number;

  constructor(index: number, timestamp: Date, klantId: number, datum: Date, bedrag: number) {
    super(index, timestamp, 'AfrekeningViaOverschrijvingVerifierenCommand');
    this._klantId = klantId;
    this._datum = datum;
    this._bedrag = bedrag;
  }

  execute(executor: CommandService) {
    return executor.executeAfrekeningViaOverschrijvingVerifierenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get datum(): Date {
    return this._datum;
  }

  get bedrag(): number {
    return this._bedrag;
  }

}
