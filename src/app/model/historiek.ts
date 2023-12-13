import {HistoriekJaar} from './historiek-jaar';
import {Product} from './product';
import {Klant} from './klant';
import {Kassa} from './kassa';
import {HistoriekTelling} from './historiek-telling';
import {HistoriekAfsluiting} from './historiek-afsluiting';

export class Historiek {

  private _jaren: HistoriekJaar[];

  constructor() {
    this._jaren = [];
  }

  set jaren(jaren: HistoriekJaar[]) {
    this._jaren = jaren;
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

  aankoopToevoegen(timestamp: Date, klant: Klant, product: Product): Historiek {
    const historiekJaar = this.getOrCreateJaar(timestamp.getFullYear());
    const bedrag = product.getPrijs(klant.klantType);

    historiekJaar.getOrCreateVerkoopPerProduct(product).aantalVerkocht++;
    historiekJaar.getOrCreateVerkoopPerProduct(product).bedrag += bedrag;

    historiekJaar.getOrCreateVerkoopPerKlant(klant).aantalGekocht++;
    historiekJaar.getOrCreateVerkoopPerKlant(klant).bedrag += bedrag;

    return this;
  }

  aankoopVerwijderen(timestamp: Date, klant: Klant, product: Product): Historiek {
    const historiekJaar = this.getOrCreateJaar(timestamp.getFullYear());
    const bedrag = product.getPrijs(klant.klantType);

    historiekJaar.getOrCreateVerkoopPerProduct(product).aantalVerkocht--;
    historiekJaar.getOrCreateVerkoopPerProduct(product).bedrag -= bedrag;

    historiekJaar.getOrCreateVerkoopPerKlant(klant).aantalGekocht--;
    historiekJaar.getOrCreateVerkoopPerKlant(klant).bedrag -= bedrag;

    return this;
  }

  klantAfrekenen(timestamp: Date, klant: Klant, kassa: Kassa, viaOverschrijving: boolean): Historiek {
    const historiekJaar = this.getOrCreateJaar(timestamp.getFullYear());
    const bedrag = klant.getSchuld();

    if (historiekJaar.samenvatting.saldoStart === 0) historiekJaar.samenvatting.saldoStart = kassa.saldo;
    if (historiekJaar.samenvatting.saldoEnd === 0) historiekJaar.samenvatting.saldoEnd = kassa.saldo;

    historiekJaar.samenvatting.inkomsten += bedrag;
    if (viaOverschrijving) {
      historiekJaar.samenvatting.saldoOverschrijvingen += bedrag;
    } else {
      historiekJaar.samenvatting.saldoCash += bedrag;
      historiekJaar.samenvatting.saldoEnd += bedrag;
    }

    return this;
  }

  kassaTellen(timestamp: Date, saldo: number, opmerking: string, kassa: Kassa): Historiek {
    const historiekJaar = this.getOrCreateJaar(timestamp.getFullYear());
    if (historiekJaar.samenvatting.saldoStart === 0) historiekJaar.samenvatting.saldoStart = saldo;
    if (historiekJaar.samenvatting.saldoEnd === 0) historiekJaar.samenvatting.saldoEnd = saldo;

    const verschil = saldo - kassa.saldo;
    historiekJaar.samenvatting.saldoEnd += verschil;
    historiekJaar.samenvatting.saldoTellingen += verschil;
    historiekJaar.samenvatting.inkomsten += verschil;

    historiekJaar.addTelling(new HistoriekTelling(timestamp, saldo, kassa.saldo, verschil));

    return this;
  }

  kassaAfsluiten(timestamp: Date, bedrag: number, opmerking: string, kassa: Kassa): Historiek {
    const historiekJaar = this.getOrCreateJaar(timestamp.getFullYear());
    if (historiekJaar.samenvatting.saldoStart === 0) historiekJaar.samenvatting.saldoStart = kassa.saldo;
    if (historiekJaar.samenvatting.saldoEnd === 0) historiekJaar.samenvatting.saldoEnd = kassa.saldo;

    historiekJaar.samenvatting.saldoAfsluitingen += bedrag;
    historiekJaar.samenvatting.saldoEnd -= bedrag;

    historiekJaar.addAfluiting(new HistoriekAfsluiting(timestamp, bedrag, opmerking));

    return this;
  }

}
