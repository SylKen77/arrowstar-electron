import {CommandService} from '../services/command-service';

export abstract class Command {

  private _index: number;
  private _timestamp: Date;
  private _commandName: string;

  constructor(index: number, timestamp: Date, commandName: string) {
    this._index = index;
    this._timestamp = timestamp;
    this._commandName = commandName;
  }

  abstract execute(commandExecutor: CommandService);

  get index(): number {
    return this._index;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get commandName(): string {
    return this._commandName;
  }

}
