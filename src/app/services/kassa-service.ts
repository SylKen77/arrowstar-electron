import {Store} from './store';
import {Kassa} from '../model/kassa';
import {Injectable} from '@angular/core';
import {Aankoop} from '../model/aankoop';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {KassaInitCommand} from '../commands/kassa-init-command';
import {Klant} from '../model/klant';
import {AfrekeningViaOverschrijvingVerifierenCommand} from '../commands/afrekening-via-overschrijving-verifieren-command';

@Injectable()
export class KassaService extends Store<Kassa> {

  constructor() {
    super(new Kassa(150.0));
  }

  aankoopToevoegen(aankoop: Aankoop) {
    this.state.aankoopToevoegen(aankoop);
  }

  aankoopVerwijderen(teVerwijderenAankoop: Aankoop) {
    this.state.aankoopVerwijderen(teVerwijderenAankoop);
  }

  klantAfrekenen(klant: Klant, datum: Date, viaOverschrijving: boolean, bedrag: number) {
    this.state.klantAfrekenen(klant, datum, viaOverschrijving, bedrag);
  }

  kassaTellen(command: KassaTellenCommand) {
    this.state.tellingToevoegen(command.saldo, command.timestamp, command.opmerking);
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    this.state.afsluitingToevoegen(command.bedrag, command.timestamp, command.opmerking);
  }

  kasaInit(command: KassaInitCommand) {
    this.state.initBedrag(command.bedrag);
  }

  verifieerAfrekeningViaOverschrijving(command: AfrekeningViaOverschrijvingVerifierenCommand) {
    this.state.verifieerAfrekeningViaOverschrijving(command.klantId, command.bedrag, command.timestamp);
  }

}
