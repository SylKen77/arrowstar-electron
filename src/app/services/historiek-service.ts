import {Injectable} from '@angular/core';
import {Store} from './store';
import {Historiek} from '../model/historiek';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {AankoopVerwijderenCommand} from '../commands/aankoop-verwijderen-command';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KlantService} from './klant-service';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KassaService} from './kassa-service';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {HistoriekTelling} from '../model/historiek-telling';
import {HistoriekAfsluiting} from '../model/historiek-afsluiting';

@Injectable()
export class HistoriekService extends Store<Historiek> {

  constructor(private klantService: KlantService,
              private kassaService: KassaService) {
    super(new Historiek());
  }

  aankoopToevoegen(command: AankoopToevoegenCommand) {
    const historiekJaar = this.state.getOrCreateJaar(command.timestamp.getFullYear());
    // TODO
  }

  aankoopVerwijderen(command: AankoopVerwijderenCommand) {
    const historiekJaar = this.state.getOrCreateJaar(command.timestamp.getFullYear());
    // TODO
  }

  afrekenen(command: KlantAfrekenenCommand) {
    const historiekJaar = this.state.getOrCreateJaar(command.timestamp.getFullYear());
    const bedrag = this.klantService.getKlant(command.klantId).getSchuld();

    if (historiekJaar.samenvatting.saldoStart === 0) historiekJaar.samenvatting.saldoStart = this.kassaService.state.saldo;
    if (historiekJaar.samenvatting.saldoEnd === 0) historiekJaar.samenvatting.saldoEnd = this.kassaService.state.saldo;
    else historiekJaar.samenvatting.saldoEnd += bedrag;

    historiekJaar.samenvatting.inkomsten += bedrag;

  }

  kassaTellen(command: KassaTellenCommand) {
    const historiekJaar = this.state.getOrCreateJaar(command.timestamp.getFullYear());
    if (historiekJaar.samenvatting.saldoStart === 0) historiekJaar.samenvatting.saldoStart = command.saldo;
    if (historiekJaar.samenvatting.saldoEnd === 0) historiekJaar.samenvatting.saldoEnd = command.saldo;

    const verschil = command.saldo - this.kassaService.state.saldo;
    historiekJaar.samenvatting.saldoTellingen += verschil;
    historiekJaar.addTelling(new HistoriekTelling(command.timestamp, command.saldo, this.kassaService.state.saldo, verschil));
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    const historiekJaar = this.state.getOrCreateJaar(command.timestamp.getFullYear());
    if (historiekJaar.samenvatting.saldoStart === 0) historiekJaar.samenvatting.saldoStart = this.kassaService.state.saldo;
    if (historiekJaar.samenvatting.saldoEnd === 0) historiekJaar.samenvatting.saldoEnd = this.kassaService.state.saldo;


    historiekJaar.samenvatting.saldoAfsluitingen += command.bedrag;
    historiekJaar.samenvatting.saldoEnd -= command.bedrag;
    historiekJaar.addAfluiting(new HistoriekAfsluiting(command.timestamp, command.bedrag, command.opmerking));
  }
}
