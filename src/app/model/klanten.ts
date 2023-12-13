import {Klant} from './klant';
import {KlantType} from './klant-type';

export class Klanten {

  private nextKlantId: number;
  private klanten: Klant[] = [];

  getNextKlantId(): number {
    return this.nextKlantId;
  }

  getKlanten() {
    return this.klanten;
  }

  getKlant(klantId: number): Klant {
    return this.klanten.find(klant => klant.klantId === klantId);
  }

  voegKlantToe(klantId: number, naam: string, type: KlantType) {
    const klant = new Klant(klantId, naam, type, this.klanten.length);
    this.klanten = [...this.klanten, klant];
    this.nextKlantId = Math.max(this.nextKlantId, klantId + 1);
  }

  wijzigKlant(klantId: number, naam: string) {
    const klant = this.getKlant((klantId));
    klant.setNaam(naam);
  }

  deleteKlant(klantId: number) {
    const klant = this.getKlant(klantId);
    if (klant.heeftOnbetaaldeAankopen()) return;
    this.verwijderKlant(klant);
  }

  afrekenen(klantId: number): number {
    const klant = this.getKlant(klantId);
    const bedrag = klant.rekenAf();
    if (klant.klantType === KlantType.GAST) this.verwijderKlant(klant);
    return bedrag;
  }

  zetKlantOmhoog(klantId: number) {
    const klant = this.getKlant(klantId);
    const sortOrder = klant.sortOrder;
    if (sortOrder === 0) return;
    const klantBoven = this.klanten[sortOrder - 1];
    klant.setSortOrder(sortOrder - 1);
    klantBoven.setSortOrder(sortOrder);
    this.sortKlanten();
  }

  zetKlantOmlaag(klantId: number) {
    const klant = this.getKlant(klantId);
    const sortOrder = klant.sortOrder;
    if (sortOrder === (this.klanten.length - 1)) return;
    const klantOnder = this.klanten[sortOrder + 1];
    klant.setSortOrder(sortOrder + 1);
    klantOnder.setSortOrder(sortOrder);
    this.sortKlanten();
  }

  private sortKlanten() {
    this.klanten = this.klanten.sort((k1, k2) => k1.sortOrder - k2.sortOrder);
  }

  private verwijderKlant(klant: Klant) {
    this.klanten = this.klanten.filter(k => k !== klant);
    this.setSortOrderEqualToIndex();
  }

  private setSortOrderEqualToIndex() {
    this.klanten.forEach((k, i) => k.setSortOrder(i));
  }

}
