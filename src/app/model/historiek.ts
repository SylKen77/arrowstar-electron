import {HistoriekJaar} from './historiek-jaar';

export class Historiek {

  private _jaren: HistoriekJaar[];

  constructor() {
    this._jaren = [];
  }

  get jaren(): HistoriekJaar[] {
    return this._jaren;
  }

  getOrCreateJaar(jaar: number): HistoriekJaar {
    let historiekJaar = this._jaren.find(hj => hj.jaar === jaar);
    if (historiekJaar === undefined) {
      historiekJaar = new HistoriekJaar(jaar);
      this._jaren = [...this._jaren, historiekJaar];
    }
    return historiekJaar;
  }

}
