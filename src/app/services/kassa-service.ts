import {Store} from './store';
import {Kassa} from '../model/kassa';
import {Injectable} from '@angular/core';
import {Aankoop} from '../model/aankoop';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KassaInitBedragCommand} from '../commands/kassa-init-bedrag-command';

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

  aankopenWijzigen(gewijzigdeAankopen: Aankoop[]) {
    this.state.aankopenWijzigen(gewijzigdeAankopen);
  }

  aankoopAfrekenen(afTeRekenenAankoop: Aankoop, datum: Date) {
    this.state.aankoopAfrekenen(afTeRekenenAankoop, datum);
  }

  aankoopViaOverschrijvingAfrekenen(afTeRekenenAankoop: Aankoop) {
    this.state.verwijderOnbetaaldeAankoopViaOverschrijving(afTeRekenenAankoop);
  }

  kassaTellen(command: KassaTellenCommand) {
    this.state.tellingToevoegen(command.saldo, command.timestamp, command.opmerking);
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    this.state.afsluitingToevoegen(command.bedrag, command.timestamp, command.opmerking);
  }

  kasaInit(command: KassaInitBedragCommand) {
    this.state.initBedrag(command.bedrag);
  }
}
