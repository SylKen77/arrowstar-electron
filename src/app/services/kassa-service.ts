import {Store} from './store';
import {Kassa} from '../model/kassa';
import {Injectable} from '@angular/core';
import {Aankoop} from '../model/aankoop';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';

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

  aankoopAfrekenen(afTeRekenenAankoop: Aankoop) {
    this.state.aankoopAfrekenen(afTeRekenenAankoop);
  }

  kassaTellen(command: KassaTellenCommand) {
    this.state.tellingToevoegen(command.saldo, command.timestamp, command.opmerking);
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    this.state.afsluitingToevoegen(command.bedrag, command.timestamp, command.opmerking);
  }

}
