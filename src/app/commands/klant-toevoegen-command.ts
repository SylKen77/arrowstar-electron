import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantToevoegenCommand extends Command {

  private readonly _klantId: number;
  private readonly _naam: string;
  private readonly _klantType: string;

  constructor(index: number, timestamp: Date, klantId: number, naam: string, klantType: string) {
    super(index, timestamp, 'KlantToevoegenCommand');
    this._klantId = klantId;
    this._naam = naam;
    this._klantType = klantType;
  }

  execute(executor: CommandService) {
    console.log('KlantToevoegenCommand.execute');
    executor.executeKlantToevoegenCommand(this);
  }

  get klantId(): number {
    return this._klantId;
  }

  get naam(): string {
    return this._naam;
  }


  get klantType(): string {
    return this._klantType;
  }

}
