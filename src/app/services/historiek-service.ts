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
import {ProductService} from './product-service';
import {HistoriekInitCommand} from '../commands/historiek-init-command';

@Injectable()
export class HistoriekService extends Store<Historiek> {

  constructor(private klantService: KlantService,
              private kassaService: KassaService,
              private productService: ProductService) {
    super(new Historiek());
  }

  init(command: HistoriekInitCommand) {
    this.state.jaren = command.historiek.jaren;
  }

  aankoopToevoegen(command: AankoopToevoegenCommand) {
    const klant = this.klantService.getKlant(command.klantId);
    const product = this.productService.getProduct(command.productId);
    const newHistoriek = this.state.aankoopToevoegen(command.timestamp, klant, product);
    this.setState(newHistoriek);
  }

  aankoopVerwijderen(command: AankoopVerwijderenCommand) {
    const klant = this.klantService.getKlant(command.klantId);
    const product = this.productService.getProduct(command.productId);
    const newHistoriek = this.state.aankoopVerwijderen(command.timestamp, klant, product);
    this.setState(newHistoriek);
  }

  afrekenen(command: KlantAfrekenenCommand) {
    const klant = this.klantService.getKlant(command.klantId);
    const newHistoriek = this.state.klantAfrekenen(command.timestamp, klant, this.kassaService.state, command.viaOverschrijving);
    this.setState(newHistoriek);
  }

  kassaTellen(command: KassaTellenCommand) {
    const newHistoriek = this.state.kassaTellen(command.timestamp, command.saldo, command.opmerking, this.kassaService.state);
    this.setState(newHistoriek);
  }

  kassaAfsluiten(command: KassaAfsluitenCommand) {
    const newHistoriek = this.state.kassaAfsluiten(command.timestamp, command.bedrag, command.opmerking, this.kassaService.state);
    this.setState(newHistoriek);
  }

}
