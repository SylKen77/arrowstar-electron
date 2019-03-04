import {Injectable} from '@angular/core';
import {Store} from './store';
import {Aankoop} from '../model/aankoop';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {KlantService} from './klant-service';
import {ProductService} from './product-service';
import {AankoopVerwijderenCommand} from '../commands/aankoop-verwijderen-command';
import {KassaService} from './kassa-service';
import {AankoopWijzigenCommand} from '../commands/aankoop-wijzigen-command';

@Injectable()
export class AankoopService extends Store<Aankoop[]> {

  constructor(private klantService: KlantService, private productService: ProductService, private kassaService: KassaService) {
    super([]);
  }

  aankoopToevoegen(aankoopToevoegenCommand: AankoopToevoegenCommand) {
    const klant = this.klantService.getKlant(aankoopToevoegenCommand.klantId);
    const product = this.productService.getProduct(aankoopToevoegenCommand.productId);
    const aankoop = new Aankoop(aankoopToevoegenCommand.aankoopId, klant, product);
    klant.aankoopToevoegen(aankoop);
    this.kassaService.aankoopToevoegen(aankoop);
    this.setState([...this.state, aankoop]);
  }

  aankoopVerwijderen(aankoopVerwijderenCommand: AankoopVerwijderenCommand) {
    const klant = this.klantService.getKlant(aankoopVerwijderenCommand.klantId);
    const teVerwijderenAankoop = klant.aankopen
      .filter(aankoop => aankoop.product.productId === aankoopVerwijderenCommand.productId)
      .filter(aankoop => !aankoop.betaald)
      .pop();
    klant.aankoopVerwijderen(teVerwijderenAankoop);
    this.kassaService.aankoopVerwijderen(teVerwijderenAankoop);
    this.setState(this.state.filter(aankoop => aankoop !== teVerwijderenAankoop));
  }

  aankoopWijzigen(aankoopWijzigenCommand: AankoopWijzigenCommand) {
    const klant = this.klantService.getKlant(aankoopWijzigenCommand.klantId);
    const teWijzigenAankopen = klant.aankopen
      .filter(aankoop => aankoop.product.productId === aankoopWijzigenCommand.productId)
      .filter(aankoop => !aankoop.betaald);
    teWijzigenAankopen.forEach(aankoop => aankoop.viaOverschrijving = aankoopWijzigenCommand.viaOverschrijving);
    this.kassaService.aankopenWijzigen(teWijzigenAankopen);
  }

}
