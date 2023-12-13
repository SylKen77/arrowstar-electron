import {Store} from './store';
import {Injectable} from '@angular/core';
import {Klant} from '../model/klant';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {KlantType} from '../model/klant-type';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KassaService} from './kassa-service';
import {KlantZetOmhoogCommand} from '../commands/klant-zet-omhoog-command';
import {KlantZetOmlaagCommand} from '../commands/klant-zet-omlaag-command';
import {DeleteKlantCommand} from '../commands/delete-klant-command';
import {KlantWijzigenCommand} from '../commands/klant-wijzigen-command';
import {Klanten} from '../model/klanten';

@Injectable()
export class KlantService extends Store<Klanten> {

  private klanten: Klanten = new Klanten();

  constructor(private kassaService: KassaService) {
    super(new Klanten());
  }

  getNextKlantId(): number {
    return this.klanten.getNextKlantId();
  }

  klantToevoegen(klantToevoegenCommand: KlantToevoegenCommand) {
    this.klanten.voegKlantToe(klantToevoegenCommand.klantId,  klantToevoegenCommand.naam, klantToevoegenCommand.klantType === 'LID' ? KlantType.LID : KlantType.GAST);
    this.setState(this.klanten);
  }

  getKlant(klantId: number): Klant {
    return this.klanten.getKlant(klantId);
  }

  heeftOnbetaaldeAankopen(productId: number): boolean {
    return this.state.getKlanten().some(klant => klant.getOnbetaaldeAankopen().some(aankoop => aankoop.product.productId === productId));
  }

  afrekenen(klantAfrekenenCommand: KlantAfrekenenCommand) {
    const bedrag = this.klanten.afrekenen(klantAfrekenenCommand.klantId);
    this.setState(this.klanten);

    // Kassa updaten
    this.kassaService.klantAfrekenen(this.getKlant(klantAfrekenenCommand.klantId), klantAfrekenenCommand.timestamp, klantAfrekenenCommand.viaOverschrijving, bedrag);
  }

  zetKlantOmhoog(command: KlantZetOmhoogCommand) {
    this.klanten.zetKlantOmhoog(command.klantId);
    this.setState(this.klanten);
  }

  zetKlantOmlaag(command: KlantZetOmlaagCommand) {
    this.klanten.zetKlantOmlaag(command.klantId);
    this.setState(this.klanten);
  }

  deleteKlant(command: DeleteKlantCommand) {
    this.klanten.deleteKlant(command.klantId);
    this.setState(this.klanten);
  }

  klantWijzigen(command: KlantWijzigenCommand) {
    this.klanten.wijzigKlant(command.klantId, command.naam);
    this.setState(this.state);
  }

}
