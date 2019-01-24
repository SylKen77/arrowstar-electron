import {Store} from './store';
import {Injectable} from '@angular/core';
import {Klant} from '../model/klant';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {KlantType} from '../model/klant-type';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KassaService} from './kassa-service';
import {KlantZetOmhoogCommand} from '../commands/klant-zet-omhoog-command';
import {KlantZetOmlaagCommand} from '../commands/klant-zet-omlaag-command';

@Injectable()
export class KlantService extends Store<Klant[]> {

  constructor(private kassaService: KassaService) {
    super([]);
  }

  klantToevoegen(klantToevoegenCommand: KlantToevoegenCommand) {
    const klant = new Klant(
      klantToevoegenCommand.klantId,
      klantToevoegenCommand.naam,
      klantToevoegenCommand.voornaam,
      klantToevoegenCommand.klantType === 'LID' ? KlantType.LID : KlantType.GAST,
      this.state.length);

    this.setState([...this.state, klant]);
  }

  getKlant(klantId: number): Klant {
    return this.state.find(klant => klant.klantId === klantId);
  }

  afrekenen(klantAfrekenenCommand: KlantAfrekenenCommand) {
    const klant = this.getKlant(klantAfrekenenCommand.klantId);

    // Alle aankopen van de klant afrekenen
    klant.getOnbetaaldeAankopen().forEach(aankoop => {
      aankoop.setBetaald();
      this.kassaService.aankoopAfrekenen(aankoop, klantAfrekenenCommand.timestamp);
    });

    // Gasten worden verwijderd na het afrekenen
    if (klant.klantType === KlantType.GAST) {
      this.verwijderKlantUitStore(klant);
    }
  }

  zetKlantOmhoog(command: KlantZetOmhoogCommand) {
    const klant = this.getKlant(command.klantId);
    const sortOrder = klant.sortOrder;
    console.log('sortOrder voor klant ' + klant.voornaam + ' ' + klant.naam + ' is ' + sortOrder);
    if (sortOrder === 0) return;
    const klantBoven = this.state[sortOrder - 1];
    klant.setSortOrder(sortOrder - 1);
    klantBoven.setSortOrder(sortOrder);

    console.log('new sortOrder voor klant ' + klant.voornaam + ' ' + klant.naam + ' is ' + klant.sortOrder);
    console.log('new sortOrder voor klant ' + klantBoven.voornaam + ' ' + klantBoven.naam + ' is ' + klantBoven.sortOrder);


    this.sortKlanten();
  }

  zetKlantOmlaag(command: KlantZetOmlaagCommand) {
    const klant = this.getKlant(command.klantId);
    const sortOrder = klant.sortOrder;
    console.log('sortOrder voor klant ' + klant.voornaam + ' ' + klant.naam + ' is ' + sortOrder);
    if (sortOrder === (this.state.length - 1)) return;
    const klantOnder = this.state[sortOrder + 1];
    klant.setSortOrder(sortOrder + 1);
    klantOnder.setSortOrder(sortOrder);

    console.log('new sortOrder voor klant ' + klant.voornaam + ' ' + klant.naam + ' is ' + klant.sortOrder);
    console.log('new sortOrder voor klant ' + klantOnder.voornaam + ' ' + klantOnder.naam + ' is ' + klantOnder.sortOrder);

    this.sortKlanten();

  }

  sortKlanten() {
    this.setState(this.state.sort((k1, k2) => k1.sortOrder - k2.sortOrder));
  }

  verwijderKlantUitStore(klant: Klant) {
    this.setState(this.state.filter(k => k !== klant));
  }

}
