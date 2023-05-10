import {HistoriekJaarSamenvatting} from './historiek-jaar-samenvatting';
import {HistoriekTelling} from './historiek-telling';
import {HistoriekAfsluiting} from './historiek-afsluiting';


export class HistoriekJaar {

  private _jaar: number;
  private _samenvatting: HistoriekJaarSamenvatting;
  private _tellingen: HistoriekTelling[];
  private _afsluitingen: HistoriekAfsluiting[];

  constructor(jaar: number) {
    this._jaar = jaar;
    this._samenvatting = new HistoriekJaarSamenvatting();
    this._tellingen = [];
    this._afsluitingen = [];
  }

  get jaar(): number {
    return this._jaar;
  }

  get samenvatting(): HistoriekJaarSamenvatting {
    return this._samenvatting;
  }

  get tellingen(): HistoriekTelling[] {
    return this._tellingen;
  }

  get afsluitingen(): HistoriekAfsluiting[] {
    return this._afsluitingen;
  }

  addTelling(telling: HistoriekTelling) {
    this._tellingen = [...this._tellingen, telling];
  }

  addAfluiting(afsluiting: HistoriekAfsluiting) {
    this._afsluitingen = [...this._afsluitingen, afsluiting];
  }


}
