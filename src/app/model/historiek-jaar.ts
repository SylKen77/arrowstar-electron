import {HistoriekJaarSamenvatting} from './historiek-jaar-samenvatting';


export class HistoriekJaar {

  private _jaar: number;
  private _samenvatting: HistoriekJaarSamenvatting;

  constructor(jaar: number) {
    this._jaar = jaar;
    this._samenvatting = new HistoriekJaarSamenvatting();
  }

  get jaar(): number {
    return this._jaar;
  }

  get samenvatting(): HistoriekJaarSamenvatting {
    return this._samenvatting;
  }

}
