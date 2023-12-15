import {Injectable} from '@angular/core';
import {Store} from './store';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
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
import {State} from '../model/state';
import {HistoriekInitCommand} from '../commands/historiek-init-command';

@Injectable()
export class StateService extends Store<State> {

  constructor() {
    super(new State());
  }

  klantToevoegen(command: KlantToevoegenCommand) {
    this.state.klantToevoegen(command);
    this.setState(this.state);
  }

  afrekenen(command: KlantAfrekenenCommand) {
    this.state.afrekenen(command);
    this.setState(this.state);
  }

  zetKlantOmhoog(command: KlantZetOmhoogCommand) {
    this.state.zetKlantOmhoog(command);
    this.setState(this.state);
  }

  zetKlantOmlaag(command: KlantZetOmlaagCommand) {
    this.state.zetKlantOmlaag(command);
    this.setState(this.state);
  }

  deleteKlant(command: DeleteKlantCommand) {
    this.state.deleteKlant(command);
    this.setState(this.state);
  }

  klantWijzigen(command: KlantWijzigenCommand) {
    this.state.klantWijzigen(command);
    this.setState(this.state);
  }

  productToevoegen(command: ProductToevoegenCommand) {
    this.state.productToevoegen(command);
    this.setState(this.state);
  }

  productWijzigen(command: ProductWijzigenCommand) {
    this.state.productWijzigen(command);
    this.setState(this.state);
  }

  zetProductOmhoog(command: ProductZetOmhoogCommand) {
    this.state.zetProductOmhoog(command);
    this.setState(this.state);
  }

  zetProductOmlaag(command: ProductZetOmlaagCommand) {
    this.state.zetProductOmlaag(command);
    this.setState(this.state);
  }

  deleteProduct(command: DeleteProductCommand) {
    this.state.deleteProduct(command);
    this.setState(this.state);
  }

  kassaTellen(command: KassaTellenCommand) {
    this.state.kassaTellen(command);
    this.setState(this.state);
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    this.state.kassaAfsluiten(command);
    this.setState(this.state);
  }

  kassaInit(command: KassaInitCommand) {
    this.state.kassaInit(command);
    this.setState(this.state);
  }

  verifieerAfrekeningViaOverschrijving(command: AfrekeningViaOverschrijvingVerifierenCommand) {
    this.state.verifieerAfrekeningViaOverschrijving(command);
    this.setState(this.state);
  }

  aankoopToevoegen(command: AankoopToevoegenCommand) {
    this.state.aankoopToevoegen(command);
    this.setState(this.state);
  }

  aankoopVerwijderen(command: AankoopVerwijderenCommand) {
    this.state.aankoopVerwijderen(command);
    this.setState(this.state);
  }

  historiekInit(command: HistoriekInitCommand) {
    this.state.historiekInit(command);
    this.setState(this.state);
  }
}
