import {Command} from './command';
import {CommandService} from '../services/command-service';

export class KlantToevoegenCommand extends Command {

  private _klantId: number;
  private _naam: string;
  private _voornaam: string;
  private _klantType: string;

  constructor(index: number, timestamp: Date, klantId: number, naam: string, voornaam: string, klantType: string) {
    super(index, timestamp, 'KlantToevoegenCommand');
    this._klantId = klantId;
    this._naam = naam;
    this._voornaam = voornaam;
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

  get voornaam(): string {
    return this._voornaam;
  }

  get klantType(): string {
    return this._klantType;
  }

}
