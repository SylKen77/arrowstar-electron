import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantWijzigenCommand extends Command{

  private readonly _klantId: number;
  private readonly _naam: string;

  constructor(index: number, timestamp: Date, klantId: number, naam: string) {
    super(index, timestamp, 'KlantWijzigenCommand');
    this._klantId = klantId;
    this._naam = naam;
  }

  execute(executor: CommandService) {
    console.log('KlantWijzigenCommand.execute');
    executor.executeKlantWijzigenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get naam(): string {
    return this._naam;
  }

}
