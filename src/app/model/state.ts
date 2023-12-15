import {Klanten} from './klanten';
import {Producten} from './producten';
import {Kassa} from './kassa';
import {Historiek} from './historiek';
import {Aankoop} from './aankoop';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {KlantType} from './klant-type';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KlantZetOmhoogCommand} from '../commands/klant-zet-omhoog-command';
import {KlantZetOmlaagCommand} from '../commands/klant-zet-omlaag-command';
import {DeleteKlantCommand} from '../commands/delete-klant-command';
import {KlantWijzigenCommand} from '../commands/klant-wijzigen-command';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {DeleteProductCommand} from '../commands/delete-product-command';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {KassaInitCommand} from '../commands/kassa-init-command';
import {AfrekeningViaOverschrijvingVerifierenCommand} from '../commands/afrekening-via-overschrijving-verifieren-command';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {AankoopVerwijderenCommand} from '../commands/aankoop-verwijderen-command';
import {HistoriekInitCommand} from '../commands/historiek-init-command';

export class State {

  private klanten: Klanten;
  private producten: Producten;
  private kassa: Kassa;
  private historiek: Historiek;
  private aankopen: Aankoop[];

  constructor() {
    this.klanten = new Klanten();
    this.producten = new Producten();
    this.kassa = new Kassa(150);
    this.historiek = new Historiek();
    this.aankopen = []
  }

  klantToevoegen(command: KlantToevoegenCommand) {
    this.klanten.voegKlantToe(command.klantId,  command.naam, command.klantType === 'LID' ? KlantType.LID : KlantType.GAST);
  }

  afrekenen(command: KlantAfrekenenCommand) {
    const klant = this.klanten.getKlant(command.klantId);
    const bedrag = this.klanten.afrekenen(command.klantId);
    this.historiek.klantAfrekenen(command.timestamp, bedrag, this.kassa, command.viaOverschrijving);
    this.kassa.klantAfrekenen(klant, command.timestamp, command.viaOverschrijving, bedrag);
  }

  zetKlantOmhoog(command: KlantZetOmhoogCommand) {
    this.klanten.zetKlantOmhoog(command.klantId);
  }

  zetKlantOmlaag(command: KlantZetOmlaagCommand) {
    this.klanten.zetKlantOmlaag(command.klantId);
  }

  deleteKlant(command: DeleteKlantCommand) {
    this.klanten.deleteKlant(command.klantId);
  }

  klantWijzigen(command: KlantWijzigenCommand) {
    this.klanten.wijzigKlant(command.klantId, command.naam);
  }

  productToevoegen(command: ProductToevoegenCommand) {
    this.producten.productToevoegen(command);
  }

  productWijzigen(command: ProductWijzigenCommand) {
    this.producten.productWijzigen(command);
  }

  zetProductOmhoog(command: ProductZetOmhoogCommand) {
    this.producten.zetProductOmhoog(command);
  }

  zetProductOmlaag(command: ProductZetOmlaagCommand) {
    this.producten.zetProductOmlaag(command);
  }

  deleteProduct(command: DeleteProductCommand) {
    if (this.heeftOnbetaaldeAankopen(command.productId)) return;
    this.producten.deleteProduct(command);
  }

  kassaTellen(command: KassaTellenCommand) {
    this.historiek.kassaTellen(command.timestamp, command.saldo, command.opmerking, this.kassa);
    this.kassa.tellingToevoegen(command.saldo, command.timestamp, command.opmerking);
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    this.historiek.kassaAfsluiten(command.timestamp, command.bedrag, command.opmerking, this.kassa);
    this.kassa.afsluitingToevoegen(command.bedrag, command.timestamp, command.opmerking);
  }

  kassaInit(command: KassaInitCommand) {
    this.kassa.initBedrag(command.bedrag);
  }

  verifieerAfrekeningViaOverschrijving(command: AfrekeningViaOverschrijvingVerifierenCommand) {
    this.kassa.verifieerAfrekeningViaOverschrijving(command.klantId, command.bedrag, command.timestamp);
  }

  aankoopToevoegen(command: AankoopToevoegenCommand) {
    const klant = this.klanten.getKlant(command.klantId);
    const product = this.producten.getProduct(command.productId);
    const aankoop = new Aankoop(command.aankoopId, command.timestamp, klant, product);
    klant.aankoopToevoegen(aankoop);
    this.historiek.aankoopToevoegen(command.timestamp, klant, product);
    this.kassa.aankoopToevoegen(aankoop);
  }

  aankoopVerwijderen(command: AankoopVerwijderenCommand) {
    const klant = this.klanten.getKlant(command.klantId);
    const product = this.producten.getProduct(command.productId);
    const teVerwijderenAankoop = klant.aankopen
      .filter(aankoop => aankoop.product.productId === command.productId)
      .filter(aankoop => !aankoop.betaald)
      .pop();
    klant.aankoopVerwijderen(teVerwijderenAankoop);
    this.historiek.aankoopVerwijderen(command.timestamp, klant, product);
    this.kassa.aankoopVerwijderen(teVerwijderenAankoop);
  }

  historiekInit(command: HistoriekInitCommand) {
    this.historiek.jaren = command.historiek.jaren;
  }

  heeftOnbetaaldeAankopen(productId: number): boolean {
    return this.klanten.getKlanten().some(klant => klant.getOnbetaaldeAankopen().some(aankoop => aankoop.product.productId === productId));
  }

  getKlanten(): Klanten {
    return this.klanten;
  }

  getProducten(): Producten {
    return this.producten;
  }

  getKassa(): Kassa {
    return this.kassa;
  }

  getHistoriek(): Historiek {
    return this.historiek;
  }

  getAankopen(): Aankoop[] {
    return this.aankopen;
  }

}
