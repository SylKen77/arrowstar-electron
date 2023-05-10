export class HistoriekTelling {
  private _datum: Date;
  private _theoretischBedrag: number;
  private _effectiefBedrag: number;
  private _verschil: number;

  constructor(datum: Date, effectiefBedrag: number, theoretischBedrag: number, verschil: number) {
    this._datum = datum;
    this._theoretischBedrag = theoretischBedrag;
    this._effectiefBedrag = effectiefBedrag;
    this._verschil = verschil;
  }

  get datum(): Date {
    return this._datum;
  }

  set datum(value: Date) {
    this._datum = value;
  }

  get theoretischBedrag(): number {
    return this._theoretischBedrag;
  }

  set theoretischBedrag(value: number) {
    this._theoretischBedrag = value;
  }

  get effectiefBedrag(): number {
    return this._effectiefBedrag;
  }

  set effectiefBedrag(value: number) {
    this._effectiefBedrag = value;
  }


  get verschil(): number {
    return this._verschil;
  }

  set verschil(value: number) {
    this._verschil = value;
  }
}
