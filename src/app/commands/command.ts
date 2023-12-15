import {CommandService} from '../services/command-service';
import {CommandExecutor} from '../services/command-executor';

export abstract class Command {

  private readonly _index: number;
  private readonly _timestamp: Date;
  private readonly _commandName: string;

  protected constructor(index: number, timestamp: Date, commandName: string) {
    this._index = index;
    this._timestamp = timestamp;
    this._commandName = commandName;
  }

  abstract execute(commandExecutor: CommandExecutor);

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
