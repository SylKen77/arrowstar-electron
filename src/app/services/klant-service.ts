import {Store} from './store';
import {Injectable} from '@angular/core';
import {Klant} from '../model/klant';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {KlantType} from '../model/klant-type';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KassaService} from './kassa-service';

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
      klantToevoegenCommand.klantType === 'LID' ? KlantType.LID : KlantType.GAST);

    this.setState([...this.state, klant]);
  }

  getKlant(klantId: number): Klant {
    return this.state.find(klant => klant.klantId === klantId);
  }

  afrekenen(klantAfrekenenCommand: KlantAfrekenenCommand) {
    const klant = this.getKlant(klantAfrekenenCommand.klantId);
    klant.getOnbetaaldeAankopen().forEach(aankoop => {
      aankoop.setBetaald();
      this.kassaService.aankoopAfrekenen(aankoop);
    });
    if (klant.klantType === KlantType.GAST) {
      this.setState(this.state.filter(k => k !== klant));
    }
  }

}
